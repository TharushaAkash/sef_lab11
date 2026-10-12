import fallbackImage from "../../assets/hero.png";

// Match names instead of IDs: database IDs may differ from the old sample menu.
const images = {
  "kottu roti": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/500px-Chicken_Kottu.jpg",
  "fried rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cebu_Food_Trip_%2811051504383%29.jpg/960px-Cebu_Food_Trip_%2811051504383%29.jpg",
  "veg sub": "https://hips.hearstapps.com/hmg-prod/images/vegetarianitaliansub1-1643994462.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  "watalappan": "https://www.hungrylankan.com/wp-content/uploads/2025/09/Sri-Lankan-watalappam-3-1152x1536.jpg.webp",
  "iced milo": "https://static.wixstatic.com/media/8eac57_99e71b99d8ff4c4a85adca8ab3ec5b7f~mv2.jpg/v1/fill/w_925,h_1253,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8eac57_99e71b99d8ff4c4a85adca8ab3ec5b7f~mv2.jpg",
};

export function dishImage(dish) {
  return dish.image || images[dish.name.trim().toLowerCase()] || fallbackImage;
}

export function handleImageError(event) {
  const img = event.currentTarget;
  if (img.getAttribute("src") !== fallbackImage) img.src = fallbackImage;
}
