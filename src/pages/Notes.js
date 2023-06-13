import React, { useState } from "react";
import NoteItem from "../components/NoteItem";
import { getAllNotes } from "../api/notes";
import { useQuery } from "@tanstack/react-query";
import AddNote from "../components/AddNote";
import { useMutation } from "@tanstack/react-query";

const Notes = () => {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);

  const noteList = notes?.map((note) => <NoteItem key={note._id} {...note} />);

  // const { mutate: AddNoteFun } = useMutation({
  //   mutationFn: () => AddNote(notes),
  // });

  return (
    <div className="p-5 min-h-screen bg-gray-900">
      {/* Add note button */}
      <div className="mb-5">
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Note
        </button>
      </div>
      {/* Note list */}
      <div className="flex flex-wrap gap-3 ">{noteList}</div>

      {/* Add note modal */}
      <AddNote show={show} onClose={onClose} onSave={() => {}} />
    </div>
  );
};

export default Notes;
