import Swal from "sweetalert2";

export const showToast = (type, message, duration = 2000) => {
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
    background: "#f1adadff",
    iconColor: type === "success" ? "#4CAF50" :
               type === "error" ? "#D33" :
               type === "warning" ? "#FF9800" :
               "#2196F3"
  });
};
