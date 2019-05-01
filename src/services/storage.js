class Storage {
  constructor() {
    this.storageKey = 'g1tc0mp4r3-r3p0s';
  }

  store(repo) {
    const currentStorage = this.getAll();
    if (currentStorage) {
      currentStorage.push(repo);
      localStorage.setItem(this.storageKey, JSON.stringify(currentStorage));
    } else {
      localStorage.setItem(this.storageKey, JSON.stringify([repo]));
    }
  }

  update(repo) {
    const currentStorage = this.getAll();
    const repoIndex = currentStorage.findIndex(rep => rep.id === repo.id);
    currentStorage[repoIndex] = repo;
    localStorage.setItem(this.storageKey, JSON.stringify(currentStorage));
  }

  remove(repo) {
    const currentStorage = this.getAll();
    const repoIndex = currentStorage.findIndex(rep => rep.id === repo.id);
    currentStorage.splice(repoIndex, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(currentStorage));
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }
}

export default new Storage();
