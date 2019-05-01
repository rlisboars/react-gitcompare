import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';
import Storage from '../../services/storage';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositoryError: false,
    loading: false,
    repositories: [],
  };

  componentWillMount() {
    const localRepositories = Storage.getAll();
    if (localRepositories)
      this.setState({
        repositories: localRepositories,
      });
  }

  handleAddRepository = async e => {
    e.preventDefault();

    const repFound = this.state.repositories.find(
      rep => rep.full_name === this.state.repositoryInput,
    );
    if (!repFound) {
      this.setState({ loading: true });
      try {
        const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);
        repository.lastCommit = moment(repository.pushed_at).fromNow();
        this.setState(
          {
            repositories: [...this.state.repositories, repository],
            repositoryError: false,
            repositoryInput: '',
          },
          _ => {
            Storage.store(repository);
          },
        );
      } catch (err) {
        this.setState({ repositoryError: true });
      } finally {
        this.setState({ loading: false });
      }
    } else {
      this.setState({ repositoryInput: '' });
      this.handleUpdateRepository(repFound.id);
    }
  };

  handleUpdateRepository = async repositoryId => {
    this.setState({ loading: true });
    const repositoryName = this.state.repositories.find(rep => rep.id === repositoryId).full_name;
    try {
      const { data: repository } = await api.get(`/repos/${repositoryName}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      let currentRepos = [...this.state.repositories];
      let index = currentRepos.findIndex(repo => repo.full_name === repositoryName);
      currentRepos[index] = repository;
      this.setState(
        {
          repositories: currentRepos,
          repositoryError: false,
        },
        _ => {
          Storage.update(repository);
        },
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = async repositoryId => {
    let currentRepos = [...this.state.repositories];
    let index = currentRepos.findIndex(repo => repo.id === repositoryId);
    Storage.remove(currentRepos.splice(index, 1));
    this.setState({ repositories: currentRepos });
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form onSubmit={this.handleAddRepository} withError={this.state.repositoryError}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          updateRepository={repName => this.handleUpdateRepository(repName)}
          removeRepository={repName => this.handleRemoveRepository(repName)}
        />
      </Container>
    );
  }
}
