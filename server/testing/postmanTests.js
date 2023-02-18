/* eslint-disable no-undef */
/* eslint-disable quotes */

// tests run within the Postman test console

const jsonData = pm.response.json();

pm.test("Correct Product Returned", () => {
  const responseJson = pm.response.json();
  pm.expect(responseJson.name).to.eql("Blues Suede Shoes");
  pm.expect(responseJson.features[0].feature).to.eql("Sole");
});

pm.test("Validate correct data type in response", () => {
  pm.expect(jsonData).to.be.an("object");
  pm.expect(jsonData.id).to.be.a("number");
  pm.expect(jsonData.name).to.be.a("string");
  pm.expect(jsonData.slogan).to.be.a("string");
  pm.expect(jsonData.description).to.be.a("string");
  pm.expect(jsonData.category).to.be.a("string");
  pm.expect(jsonData.features).to.be.an("array");
});

pm.test("Validate correct data with array", () => {
  pm.expect(jsonResponse.features[0].feature).to.equal('Sole');
  pm.expect(jsonResponse.features[0].value).to.equal('Rubber');
  pm.expect(jsonResponse.features[1].feature).to.equal('Material');
  pm.expect(jsonResponse.features[1].value).to.equal('FullControlSkin');
})