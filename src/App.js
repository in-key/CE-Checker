import "./App.css"
import ceData from "./ce.json"
import { useState } from "react"
import pdf_table_extractor from "./pdf-table-extractor"

function App() {
  const [stateReq, setStateReq] = useState({})
  const [credits, setCredits] = useState({})
  function handleStateChange(e) {
    e.preventDefault()
    let state = e.target.value
    if (state in ceData) {
      setStateReq(ceData[state])
    }
  }
  function handleFile(e) {
    e.preventDefault()
    let files = e.target.files
    let f = files[0]
    let reader = new FileReader()

    //PDF parsed
    function success(result) {
      const ce_data = { Total: [0, 0] }

      result.pageTables.forEach((page) => {
        page.tables.forEach((row) => {
          let topic = row[5]
          let liveHours = parseFloat(row[7])
          let homeHours = parseFloat(row[8])
          if (!isNaN(liveHours) && !isNaN(homeHours)) {
            ce_data.Total[0] += liveHours
            ce_data.Total[1] += homeHours
          }
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

      setCredits(ce_data)
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
              <th>Live Hour</th>
              <th>Home Hour</th>
            </tr>
            {Object.entries(credits).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v[0]}</td>
                <td>{v[1]}</td>
              </tr>
            ))}
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
