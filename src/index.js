const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset }) {
    const contents = JSON.parse(await asset.getCode());

    for (const type of ["icons", "screenshots"]) {
      if (Array.isArray(contents[type])) {
        for (const member of contents[type]) {
          member.src = asset.addURLDependency(member.src);
        }
      }
    }

    asset.type = "webmanifest";
    asset.setCode(JSON.stringify(contents));
    return [asset];
  },
});
