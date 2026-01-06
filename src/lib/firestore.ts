import { db } from "./firebase";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp,
    onSnapshot
} from "firebase/firestore";

// --- Types ---
export interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Timestamp;
}

export interface Release {
    id: string;
    title: string;
    date: Timestamp;
    type: 'Single' | 'EP' | 'Album';
    createdAt: Timestamp;
}

export interface Stats {
    id: string;
    listeners: number;
    streams: number;
    followers: number;
    updatedAt: Timestamp;
}

export interface Event {
    id: string;
    venue: string;
    location: string;
    date: Timestamp;
    ticketLink?: string;
    createdAt: Timestamp;
}

// --- Collections ---
export const COLLECTIONS = {
    TASKS: "tasks",
    RELEASES: "releases",
    STATS: "stats",
    EVENTS: "events"
};

// --- Helpers ---

// Tasks
export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
    const q = query(collection(db, COLLECTIONS.TASKS), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
        callback(tasks);
    });
};

export const addTask = async (text: string) => {
    await addDoc(collection(db, COLLECTIONS.TASKS), {
        text,
        completed: false,
        createdAt: Timestamp.now()
    });
};

export const toggleTask = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, COLLECTIONS.TASKS, id), { completed });
};

export const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.TASKS, id));
};

// Releases
export const subscribeToReleases = (callback: (releases: Release[]) => void) => {
    const q = query(collection(db, COLLECTIONS.RELEASES), orderBy("date", "asc"));
    return onSnapshot(q, (snapshot) => {
        const releases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Release));
        callback(releases);
    });
};

export const addRelease = async (release: Omit<Release, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, COLLECTIONS.RELEASES), {
        ...release,
        createdAt: Timestamp.now()
    });
};

export const deleteRelease = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.RELEASES, id));
};

// Stats
export const subscribeToStats = (callback: (stats: Stats | null) => void) => {
    // Assuming a single document 'main' in 'stats' collection for simplicity
    const docRef = doc(db, COLLECTIONS.STATS, 'main');
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback({ id: doc.id, ...doc.data() } as Stats);
        } else {
            callback(null);
        }
    });
};

export const updateStats = async (stats: Partial<Stats>) => {
    const docRef = doc(db, COLLECTIONS.STATS, 'main');
    // Using set with merge to create if not exists
    await import("firebase/firestore").then(({ setDoc }) =>
        setDoc(docRef, { ...stats, updatedAt: Timestamp.now() }, { merge: true })
    );
};

// Events
export const subscribeToEvents = (callback: (events: Event[]) => void) => {
    const q = query(collection(db, COLLECTIONS.EVENTS), orderBy("date", "asc"));
    return onSnapshot(q, (snapshot) => {
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        callback(events);
    });
};

export const addEvent = async (event: Omit<Event, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, COLLECTIONS.EVENTS), {
        ...event,
        createdAt: Timestamp.now()
    });
};

export const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.EVENTS, id));
};
