const axios = require("axios").default;
const puppeteer = require("puppeteer");
class ReportController {
  static async makeReport(url, data) {
    console.log(url,data);
    // data disini dapet dari parameter 2 di app.js tadi
    const id = `report-${new Date().toISOString().split(":").join("-")}`; // nama file berdasar tanggal
    axios
      .post(url, data)
      .then(function (res) {
          // res.data disini sudah berupa text html, karena return dari posts nya adalah html
          // setelah itu tinggal print pdf nya karena sudah dapat html nya
        // menjalankan puppetear
        (async function () {
          console.log(res.data);
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.setContent(res.data);
          await page.pdf({
            path: `./src/report/${id}.pdf`,
            format: "A4",
          });

          await browser.close();
          console.log("Buat File Pdf Sukses", data.path);
        })();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
}

module.exports = ReportController;
