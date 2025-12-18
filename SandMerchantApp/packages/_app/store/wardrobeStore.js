import { atom } from "nanostores";

export const $wardrobe = atom({
  category: "top", // hat | top | pants | shoes | bag
  openDrawer: false,
  // item actuellement porté par catégorie
  equipped: {
    hat: null,
    top: null,
    pants: null,
    shoes: null,
    bag: null,
  },
  // index du carousel en bas
  pageIndex: 0,
});

export function setCategory(category) {
  $wardrobe.set({
    ...$wardrobe.get(),
    category,
    openDrawer: true,
    pageIndex: 0,
  });
}

export function toggleDrawer() {
  const s = $wardrobe.get();
  $wardrobe.set({ ...s, openDrawer: !s.openDrawer });
}

export function equip(category, itemId) {
  const s = $wardrobe.get();
  $wardrobe.set({
    ...s,
    equipped: { ...s.equipped, [category]: itemId },
  });
}

export function prevPage(maxPages) {
  const s = $wardrobe.get();
  $wardrobe.set({ ...s, pageIndex: Math.max(0, s.pageIndex - 1) });
}

export function nextPage(maxPages) {
  const s = $wardrobe.get();
  $wardrobe.set({ ...s, pageIndex: Math.min(maxPages - 1, s.pageIndex + 1) });
}
