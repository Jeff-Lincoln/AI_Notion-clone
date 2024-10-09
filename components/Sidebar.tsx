'use client'

import React, { useEffect, useState } from 'react';
import NewDocumentButton from './NewDocumentButton';
import { useCollection } from 'react-firebase-hooks/firestore'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { access } from 'fs';
import SidebarOption from './SidebarOption';

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}


function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[]
  }>({
    owner: [],
    editor:[],
  });


  const [data, loading, error] = useCollection(
    user && (
        query(collectionGroup(db, 'rooms'), where('userId', "==", user.emailAddresses[0].toString()))
    )
  );

  useEffect(() => {
    if(!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor:RoomDocument[];
    }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument;

      if (roomData.role === "owner") {
        acc.owner.push({
          id:curr.id,
          ...roomData,
        });
      } else {
        acc.editor.push({
          id: curr.id,
          ...roomData,
        });
      }

      return acc;

    }, {
      owner: [],
      editor: [],
    })

    setGroupedData(grouped);
    }, [data]
  )
  const menuOptions = (
    <>
      <NewDocumentButton />
      {/* Add more menu options here if needed */}

      <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
      {groupedData.owner.length === 0 ? (
          <h2 className='text-gray-500 font-semibold text-sm'>
            no documents found
          </h2>
      ): (
        <>
        <h2 className='text-gray-500 font-semibold
        text-sm'>My Documents</h2>
        {groupedData.owner.map((doc) => (
          <SidebarOption key={doc.id} id={doc.id} 
          href={`/doc/${doc.id}`}/>
        ))}
        </>
        )}
      </div>

      {
        groupedData.editor.length > 0 && (
          <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
            <h2 className='text-gray-500 font-semibold
            text-sm'>Shared With Me!</h2>
            {groupedData.editor.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} 
              href={`/doc/${doc.id}`}/>
            ))}
          </div>
        )
      }
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      {/* Sidebar for smaller screens using a Sheet (Slide-out Menu) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open menu" className="p-2 hover:opacity-70 rounded-lg">
              <MenuIcon size={40} />
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              {menuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for larger screens, visible inline */}
      <div className="hidden md:block">
        {menuOptions}
      </div>
    </div>
  );
}

export default Sidebar;