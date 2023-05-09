import "./App.css"

function App() {
  function handleSubmit(e) {
    e.preventDefault()
    console.log(e.target.state.value)
  }
  return (
    <div className="App">
      <h1>Pharmacist CE Requirement Checker</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>State: </label>
        <select name="state" onChange={(e) => console.log(e.target.value)}>
          <option value="default">Select Your State</option>
          <option value="NJ">NJ</option>
          <option value="NY">NY</option>
        </select>
        <input type="submit"></input>
      </form>
      <table>
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
      </table>
    </div>
  )
}

export default App
