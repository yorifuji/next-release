const fs = require('fs');

module.exports = async function ({
  core,
  github,
  context,
  bump,
  verbose,
}) {
  function log(message) {
    console.log(message);
  }

  function logVerbose(message) {
    if (verbose) {
      console.log(message);
    }
  }

  function logError(error) {
    if (verbose) {
      console.error('Error:', error);
    }
    core.setFailed(error);
  }

  logVerbose(`Bumping ${bump} version`);

  let latestRelease;
  try {
    const result = await github.rest.repos.getLatestRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });
    latestRelease = result.data.tag_name;
    log(`Latest release: ${latestRelease}`);
  }
  catch (error) {
    logError(`Failed to get latest release: ${error.message}`);
    return;
  }

  function bumpVersion(version, bump) {
    const hasPrefix = version.startsWith('v');
    const strippedVersion = hasPrefix ? version.substring(1) : version;

    let [major, minor, patch] = strippedVersion.split('.').map(num => parseInt(num, 10));

    switch (bump) {
      case 'major':
        major += 1;
        minor = 0;
        patch = 0;
        break;
      case 'minor':
        minor += 1;
        patch = 0;
        break;
      case 'patch':
        patch += 1;
        break;
      default:
        throw new Error('Invalid bump type');
    }

    return hasPrefix ? `v${major}.${minor}.${patch}` : `${major}.${minor}.${patch}`;
  }

  const nextVersion = bumpVersion(latestRelease, bump);
  log(`Next latest release: ${nextVersion}`);
  const nextVersionMajor = nextVersion.substring(0, nextVersion.indexOf('.'));
  log(`Next latest release major: ${nextVersionMajor}`);

  core.setOutput('version', nextVersion);
  core.setOutput('major', nextVersionMajor);
}