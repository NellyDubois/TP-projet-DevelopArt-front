export function createSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }