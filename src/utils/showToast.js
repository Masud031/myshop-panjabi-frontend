import Swal from "sweetalert2";

export const showToast = (typeOrMessage, maybeMessage, duration = 2000) => {
  // If user passed only one arg, treat it as message and default to "info"
  let type, message;
  if (typeof maybeMessage === "undefined") {
    message = String(typeOrMessage || "");
    type = "info";
  } else {
    type = String(typeOrMessage || "info");
    message = String(maybeMessage || "");
  }

    const icons = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  };

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icons[type] || "info",
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    background: "#f6f2f2ff",
    iconColor: type === "success" ? "#4CAF50" :
               type === "error" ? "#D33" :
               type === "warning" ? "#FF9800" :
               "#2196F3"
  });
};
