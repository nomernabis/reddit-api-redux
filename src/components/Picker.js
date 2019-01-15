import React from "react"

const Picker = ({options, value, onChange}) => (
    <div>
        <select value={value} onChange={(event) => {
            onChange(event.target.value)
        }}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
)

export default Picker