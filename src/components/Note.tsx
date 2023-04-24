
import {useState, useRef,useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../store/store";
import { getNote } from "../store/noteSlice";
import { ref, child, get, remove, update, push } from "firebase/database";
import { database } from "../firebase";
import { Button, Card, Input } from "antd";


const Note = () => {
  const notes = useAppSelector((state) => state.note.notes);

  const [data, setData] = useState(notes);
  const [isValid, setIsValid] = useState(false);

  const note = useRef<string>("");
  const dispatch = useAppDispatch();
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `note`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          dispatch(getNote(snapshot.val()));
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsValid(false);
  }, [isValid,dbRef,dispatch]);

  function createNote(note: string) {
    push(child(dbRef, `note/`), {
      note: note,
    });
    setIsValid(true);
    
  }

  function updateNote(index: any, note: string) {
    const key = Object.keys(data)[index];
    const noteRef = child(dbRef, `note/${key}`);
    update(noteRef, {
      note: note,
    });
    setIsValid(true);
  }

  function deleteNote(index: any) {
    const key = Object.keys(data)[index];
    remove(child(dbRef, `note/${key}`));
    setIsValid(true);
  }

  return (
      <div>
        <Card title="Note List">
          <Input
            style={{ width: "80%", margin: 5 }}
            onChange={(e) => (note.current = e.target.value)}
          />
          <Button type="primary" onClick={() => createNote(note.current)}>
            Add
          </Button>
              {Object.values(data).map((item, index) => (
                <div key={index} style={{display:"flex",alignItems:"center"}}>
                  <span>{index + 1}</span>
                  <span style={{marginRight:"10px"}}>
                    <Input
                      style={{ margin: 5 }}
                      defaultValue={item.note}
                      onChange={(e) => (note.current = e.target.value)}
                    />
                  </span>
                  <span>
                    <Button
                      style={{ margin: 5 }}
                      type="primary"
                      onClick={() => deleteNote(index)}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ margin: 5 }}
                      type="primary"
                      onClick={() => updateNote(index, note.current)}
                    >
                      Update
                    </Button>
                  </span>
                </div>
              ))}
        </Card>
      </div>
  );
};

export default Note;
