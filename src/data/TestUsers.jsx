import React, { useEffect, useState } from 'react'
import { getAllUsers, getAllSoldiers, getAllCommanders, searchUsers } from './FetchFromUsers'

function TestUsers() {
  const [allUsers, setAllUsers] = useState([])
  const [soldiers, setSoldiers] = useState([])
  const [commanders, setCommanders] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers()
      const soldiersData = await getAllSoldiers()
      const commandersData = await getAllCommanders()
      const searchData = await searchUsers('יואב') // example search

      setAllUsers(users)
      setSoldiers(soldiersData)
      setCommanders(commandersData)
      setSearchResults(searchData)
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Users</h2>
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>

      <h2>Soldiers</h2>
      <pre>{JSON.stringify(soldiers, null, 2)}</pre>

      <h2>Commanders</h2>
      <pre>{JSON.stringify(commanders, null, 2)}</pre>

      <h2>Search Results (יואב)</h2>
      <pre>{JSON.stringify(searchResults, null, 2)}</pre>
    </div>
  )
}

export default TestUsers
