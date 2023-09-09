import { create } from "zustand";

export interface TreeItem {
    id: string;
    name: string;
}

interface DriveStore {
    tree: TreeItem[];
    setTree: (tree: TreeItem[]) => void;
    addToTree: (treeItem: TreeItem) => void;
}

export const useDriveStore = create<DriveStore>((set) => ({
    tree: [],
    setTree: (tree) => set({ tree }),
    addToTree: (treeItem) =>
        set((state) => ({ tree: [...state.tree, treeItem] })),
}));
