import slug from 'slug';

export const slugUsername = (username) => slug(username, '_');

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  console.log(
    parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i],
    'parseF'
  );
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};
