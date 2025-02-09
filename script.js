// !!!!!! FONCTIONS POUR LE PORTFOLIO !!!!!!!!!!!!!

window.onload = function () {
  // Supprimer le loader
  document.querySelector(".section-loader").style.display = "none";
};

(async function () {
  const projects = await getProjects();
  console.log(projects);
  for (project of projects) {
    displayProjects(project);
  }
})();

function getProjects() {
  return fetch(`https://api.github.com/users/Joseph0105/repos?per_page=100`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === 610891439) {
          data.splice(i, 1);
        }
      }
      data.sort(function (a, b) {
        var dateA = new Date(a.created_at);
        var dateB = new Date(b.created_at);
        return dateB - dateA;
      });

      const repositories = data;
      const repositoriesDisplay = document.querySelector(".projects-display");

      return repositories;
    })
    .catch((error) => {
      const errorMsg = document.querySelector(".error-txt");
      if (error.status === 403) {
        errorMsg.style.display = "block";
        errorMsg.textContent =
          "Erreur" +
          error.status +
          "Victime de sons succès, l'API a étée appelée trop souvent pour le moment, revenez un peu plus tard";
      } else {
        errorMsg.style.display = "block";
        errorMsg.textContent =
          "l'erreur" +
          error.status +
          "a empêché l'accès à l'API, merci réessayez ultérieurement";
      }
    });
}

function displayProjects(project) {
  const projectsDisplay = document.querySelector(".projects-display");

  const projectCard = document.createElement("div");
  projectCard.classList.add("projectCard");

  const projectLink = document.createElement("a");
  projectLink.classList.add("projectCard-link");

  const clickHere = document.createElement("div");
  clickHere.classList.add("click-here");
  clickHere.textContent = "Voir le projet";

  const projectImage = document.createElement("img");
  projectImage.classList.add("project-img");
  projectImage.src = `https://raw.githubusercontent.com/Joseph0105/${project.name}/main/img/miniature.png`;
  projectLink.appendChild(projectImage);

  projectCard.appendChild(clickHere);
  projectCard.appendChild(projectLink);
  projectCard.appendChild(projectLink);
  projectsDisplay.appendChild(projectCard);

  projectCard.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.style.display = "block";
    displayOverlay(project);
  });
}
