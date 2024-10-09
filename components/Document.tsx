'use client'

import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  useEffect(() => {
    if (data) {
      setInput(data.title); // Move useEffect here to avoid calling it inside updateTitle
    }
  }, [data]);

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input, // Fix syntax error, ensure correct updateDoc call
        });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between p-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/** Update Title... */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
      <div>
        {/** manageUsers */}
        {/** Avatars */}
      </div>
      {/** collaborative editor */}
    </div>
  );
}

export default Document;
