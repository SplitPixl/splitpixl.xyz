const template = document.getElementById("project-template")
const container = document.getElementById("projects-container")

fetch("https://api.splitpixl.xyz/api/projects/").then(r => r.json()).then(projects => {
    container.innerHTML = ""
    projects.sort((a, b) => b.rank - a.rank).forEach(project => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".project-hero").style.backgroundImage = `url('${project.image}')`
        clone.querySelector(".project-name").innerText = project.title
        clone.querySelector(".project-desc").innerText = project.short_desc
        clone.querySelector(".project-card").href = project.click_dest ? project.click_dest : "/projects?" + project.id
        container.appendChild(clone)
    })
}).catch(e => {
    console.error(e)
    container.innerHTML = "<div class='error'><span>Failed to load projects.</span></div>"
})