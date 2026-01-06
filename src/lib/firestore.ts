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

// --- NEW: Public Content Types ---
export interface MusicRelease {
    id: string;
    type: 'Single' | 'EP' | 'Album';
    title: string;
    dateLabel: string;      // "Out Now", "Late 2025", etc.
    status: 'active' | 'upcoming' | 'future';
    order: number;
    createdAt: Timestamp;
}

export interface MerchProduct {
    id: string;
    name: string;
    price: string;
    tag?: string;           // "New Drop", "Spring '26", etc.
    imageColor: string;     // Tailwind class like "bg-pacific"
    order: number;
    createdAt: Timestamp;
}

export interface TourDate {
    id: string;
    dateLabel: string;      // "May 15"
    venue: string;
    location: string;
    status: 'Available' | 'Selling Fast' | 'Sold Out';
    ticketLink?: string;
    order: number;
    createdAt: Timestamp;
}

// --- Collections ---
export const COLLECTIONS = {
    TASKS: "tasks",
    RELEASES: "releases",
    STATS: "stats",
    EVENTS: "events",
    // Public content
    MUSIC: "music",
    MERCH: "merch",
    TOUR_DATES: "tourDates"
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

// --- NEW: Public Content CRUD ---

// Music (Public Releases)
export const subscribeToMusic = (callback: (music: MusicRelease[]) => void) => {
    const q = query(collection(db, COLLECTIONS.MUSIC), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
        const music = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MusicRelease));
        callback(music);
    });
};

export const addMusic = async (music: Omit<MusicRelease, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, COLLECTIONS.MUSIC), {
        ...music,
        createdAt: Timestamp.now()
    });
};

export const updateMusic = async (id: string, music: Partial<MusicRelease>) => {
    await updateDoc(doc(db, COLLECTIONS.MUSIC, id), music);
};

export const deleteMusic = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.MUSIC, id));
};

// Merch (Public Products)
export const subscribeToMerch = (callback: (merch: MerchProduct[]) => void) => {
    const q = query(collection(db, COLLECTIONS.MERCH), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
        const merch = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MerchProduct));
        callback(merch);
    });
};

export const addMerch = async (merch: Omit<MerchProduct, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, COLLECTIONS.MERCH), {
        ...merch,
        createdAt: Timestamp.now()
    });
};

export const updateMerch = async (id: string, merch: Partial<MerchProduct>) => {
    await updateDoc(doc(db, COLLECTIONS.MERCH, id), merch);
};

export const deleteMerch = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.MERCH, id));
};

// Tour Dates (Public Shows)
export const subscribeToTourDates = (callback: (tourDates: TourDate[]) => void) => {
    const q = query(collection(db, COLLECTIONS.TOUR_DATES), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
        const tourDates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TourDate));
        callback(tourDates);
    });
};

export const addTourDate = async (tourDate: Omit<TourDate, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, COLLECTIONS.TOUR_DATES), {
        ...tourDate,
        createdAt: Timestamp.now()
    });
};

export const updateTourDate = async (id: string, tourDate: Partial<TourDate>) => {
    await updateDoc(doc(db, COLLECTIONS.TOUR_DATES, id), tourDate);
};

export const deleteTourDate = async (id: string) => {
    await deleteDoc(doc(db, COLLECTIONS.TOUR_DATES, id));
};
