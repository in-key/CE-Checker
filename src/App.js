import "./App.css"
var pdf_table_extractor = require("pdf-table-extractor")

function App() {
  function handleStateChange(e) {
    e.preventDefault()
    console.log(e.target.value)
  }
  function handleFile(e) {
    e.preventDefault()
    let files = e.target.files
    let f = files[0]
    let reader = new FileReader()

    //PDF parsed
    function success(result) {
      const ce_data = {}

      result.pageTables.forEach((page) => {
        page.tables.forEach((row) => {
          let topic = row[5]
          let liveHours = parseFloat(row[7])
          let homeHours = parseFloat(row[8])
          if (topic in ce_data) {
            let totalHours = ce_data[topic]
            totalHours[0] += liveHours
            totalHours[1] += homeHours
            ce_data[topic] = totalHours
          } else if (!isNaN(liveHours) && !isNaN(homeHours)) {
            ce_data[topic] = [liveHours, homeHours]
          }
        })
      })

      console.log(JSON.stringify(ce_data))
    }

    //Error
    function error(err) {
      console.error("Error: " + err)
    }

    reader.onload = function (e) {
      let data = e.target.result
      pdf_table_extractor(data, success, error)
    }
    reader.readAsArrayBuffer(f)
  }
  return (
    <div className="App">
      <h1>Pharmacist CE Requirement Checker</h1>
      <div>
        <form onChange={(e) => handleStateChange(e)}>
          <label>State: </label>
          <select name="state">
            <option value="default">Select Your State</option>
            <option value="NJ">NJ</option>
          </select>
        </form>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Credit Type</th>
              <th>Credit Number</th>
              <th>Requirement Met?</th>
            </tr>
            <tr>
              <th>Live</th>
              <th>10</th>
              <th>No</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <input type="file" onChange={(e) => handleFile(e)} />
      </div>
    </div>
  )
}

export default App
