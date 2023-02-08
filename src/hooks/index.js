import { useState } from "react";

//usefield custom hook for forms
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (event) => {
        setValue('')
    }

    return {
        type, reset, value, onChange
    }
}
