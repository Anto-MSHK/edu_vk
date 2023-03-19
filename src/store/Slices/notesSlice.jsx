import { createSlice } from "@reduxjs/toolkit";




const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: []
    },
    reducers: {
        addNote(state, action) {
            state.notes.push({
                subject: action.payload.subject,
                id: new Date().toISOString(),
                text: action.payload.text,
                time: action.payload.time,
            })
        },
        removeNote(state, action) {

        }

    }

})

export const { addNote, removeNote } = notesSlice.actions
export default notesSlice.reducer