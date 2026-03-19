import Image from "next/image";
import { projectSiteImages } from "@/lib/project-site-images";

type ProjectImageGalleryProps = {
  limitProjects?: number;
  maxImagesPerProject?: number;
};

function toDisplayName(value: string) {
  return value
    .replace(/\s{2,}/g, " ")
    .replace(/\bappl\b/gi, "APPL")
    .replace(/\bdlf\b/gi, "DLF")
    .replace(/\bindia\b/gi, "India")
    .replace(/\bnoida\b/gi, "Noida")
    .replace(/\bgurgaon\b/gi, "Gurgaon")
    .replace(/\bghaziabad\b/gi, "Ghaziabad")
    .replace(/\bsector\b/gi, "Sector")
    .trim();
}

export default function ProjectImageGallery({
  limitProjects,
  maxImagesPerProject,
}: ProjectImageGalleryProps) {
  const rows =
    typeof limitProjects === "number" && limitProjects > 0
      ? projectSiteImages.slice(0, limitProjects)
      : projectSiteImages;

  return (
    <section id="project-image-gallery" className="project-gallery">
      <div className="project-gallery-grid">
        {rows.map((project) => {
          const images =
            typeof maxImagesPerProject === "number" && maxImagesPerProject > 0
              ? project.images.slice(0, maxImagesPerProject)
              : project.images;

          return (
            <article key={project.projectSlug} className="project-gallery-card">
              <div className="project-gallery-head">
                <h3>{toDisplayName(project.projectName)}</h3>
                <p>{project.imageCount} Photos</p>
              </div>

              <div className="project-gallery-track">
                {images.map((imageSrc, index) => (
                  <a
                    key={`${project.projectSlug}-${imageSrc}`}
                    href={imageSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="project-gallery-shot"
                    aria-label={`Open full image ${index + 1} for ${project.projectName}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${project.projectName} site image ${index + 1}`}
                      fill
                      sizes="(max-width: 700px) 84vw, (max-width: 1200px) 36vw, 24vw"
                    />
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
