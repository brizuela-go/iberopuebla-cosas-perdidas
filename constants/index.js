export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Inicio",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Buscar",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Actividad",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Reportar cosa perdida",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Comunidades",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Perfil",
  },
];

export const profileTabs = [
  { value: "threads", label: "Hilos", icon: "/assets/reply.svg" },
  { value: "replies", label: "Respuestas", icon: "/assets/members.svg" },
  { value: "tagged", label: "Etiquetas", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Hilos", icon: "/assets/reply.svg" },
  { value: "members", label: "Miembros", icon: "/assets/members.svg" },
  { value: "requests", label: "Solicitudes", icon: "/assets/request.svg" },
];
