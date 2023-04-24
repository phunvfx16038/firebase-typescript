import { createSlice } from "@reduxjs/toolkit";

export interface Note {
  id: number|string;
  note: string;
}

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const NoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    getNote: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { getNote } = NoteSlice.actions;
export default NoteSlice.reducer;
