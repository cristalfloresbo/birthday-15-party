import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    query,
    QueryDocumentSnapshot,
    startAfter,
    updateDoc,
    where,
} from "firebase/firestore";
import { firestore } from "../config-firebase/config";

export interface Guest {
    id?: string;
    name: string;
    lastname: string;
    ci: string;
    phone: string;
    photo: string;
    scannedInvite: boolean;
}

let lastVisible: QueryDocumentSnapshot | null = null;

const guestsCollection = collection(firestore, "Guest");

const initialQuery = query(
    guestsCollection,
    limit(10) // Limita los resultados a 10 ítems
);

const fetchNumberTotalGuests = async () => {
    const countQuery = query(guestsCollection);
    const countSnapshot = await getCountFromServer(countQuery);
    return Promise.resolve(countSnapshot.data().count);
};

const getAllGuests = async () => {
    const querySnapshot = await getDocs(guestsCollection);
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const guests: Guest[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        guests.push({ ...(doc.data() as Guest), id: doc.id });
    });
    return Promise.resolve(guests);
};

const getGuests = async () => {
    const snapshot = await getDocs(initialQuery);

    if (!snapshot.empty) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]; // Guarda el último documento
        return Promise.resolve(
            snapshot.docs.map((doc) => ({
                ...(doc.data() as Guest),
                id: doc.id,
            }))
        );
    } else {
        return Promise.resolve([]);
    }
};

async function fetchNextPage() {
    const nextQuery = query(
        guestsCollection,
        startAfter(lastVisible), // Comienza después del último documento visible
        limit(10)
    );

    const snapshot = await getDocs(nextQuery);

    if (!snapshot.empty) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]; // Actualiza el último documento
        return Promise.resolve([
            ...snapshot.docs.map((doc) => ({
                ...(doc.data() as Guest),
                id: doc.id,
            })),
        ]);
    } else {
        return Promise.resolve([]);
    }
}

const addGuest = async (guest: Guest) => {
    const q = query(
        collection(firestore, "Guest"),
        where("ci", "==", guest.ci)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
        const docRef = await addDoc(guestsCollection, guest);
        if (!docRef.id) {
            return Promise.reject(new Error("Error adding guest"));
        }
        return docRef.id;
    } else {
        return Promise.reject(
            `Este invitado ${guest.name} ${guest.lastname} ya fue registrado con ${guest.ci}`
        );
    }
};

const getOneGuest: (id: string) => Promise<Guest> = async (
    id: string
): Promise<Guest> => {
    const doctRef = doc(firestore, "Guest", id);
    const docSnap = await getDoc(doctRef);
    if (docSnap.exists()) {
        return docSnap.data() as Guest;
    } else {
        return Promise.reject("No such document!");
    }
};

const deleteOneGuest = async (id: string) => {
    const doctRef = doc(firestore, "Guest", id);
    return Promise.resolve(deleteDoc(doctRef));
};

const updateGuest = async (id: string, guest: Guest) => {
    const guestRef = doc(firestore, "Guest", id);
    await updateDoc(guestRef, { ...guest });
};

export {
    getGuests,
    fetchNextPage,
    fetchNumberTotalGuests,
    getOneGuest,
    addGuest,
    deleteOneGuest,
    updateGuest,
    getAllGuests,
};
