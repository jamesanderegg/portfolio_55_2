const pageData = [{
	"name": "Portfolio",
	"children": [
		{
			"name": "DataFluent LLC",
			"hash": "datafluent",
			"id" : "datafluent",
			"description": "Custom web applications, reporting systems, practical AI tools, and operations platforms for organizations that need their data to work.",
			"component": "CoverPage",
			"children": [
				{
					"name": "Web Applications & Data Systems",
					"id": "webApplicationsDataSystems",
					"description": "Secure portals, CMS-powered websites, dashboards, reporting tools, databases, and backend systems built around real business needs.",
					"actionLabel": "View projects",
					"children": [
						{
							"name": "Web Application Projects",
							"value": 5,
							"id": "webApplicationProjects",
							"portal": "WebApplicationsPage",
							"description": "A list of deployed websites, portals, dashboards, and data systems.",
							"projects": [
								{
									"name": "SNOC",
									"id": "snocWebsite",
									"thumbnail": "/images/snoc-website-preview.png",
									"description": "Public website for The School of the Natural Order - Colorado Chapter, built with a Sanity.io content backend so program staff can maintain pages, events, and organizational content without developer support.",
									"href": "https://snoc.org",
									"actionLabel": "Visit site"
								},
								{
									"name": "Hexagon Art",
									"id": "hexagonArtWebsite",
									"thumbnail": "/images/hexagon-art-website-preview.png",
									"description": "Artist portfolio and archive site for Jeff Richards and the Hexagon Art collection. The Sanity.io CMS supports structured artwork records, flexible content updates, and a polished public presentation for a large creative catalog.",
									"href": "https://www.hexagonart.com/",
									"actionLabel": "Visit site"
								},
								{
									"name": "Colorado GEAR UP",
									"id": "coloradoGearUp",
									"thumbnail": "/images/colorado-gear-up-preview.png",
									"description": "Student records and services platform for Colorado GEAR UP, used to track participant data, services, schools, and reporting requirements for federal grant operations. The current production system is built in VB.NET, with the next grant cycle being developed in C#.",
									"href": "https://www.coloradogearup.org/",
									"actionLabel": "Visit site"
								}
							]
						}
					]
				},
				{
					"name": "AI, RAG & Workflow Automation",
					"id": "aiRagWorkflowAutomation",
					"value": 5,
					"description": "Private document search, local LLM tools, AI-assisted workflows, and automations that reduce repetitive work.",
					"actionLabel": "View projects"
				},
				{
					"name": "Contact DataFluent",
					"id": "datafluentContactMap",
					"color": "#864D45",
					"description": "Start a conversation about a website, dashboard, reporting system, AI workflow, or custom operations tool.",
					"actionLabel": "Open form",
					"children": [
						{
							"name": "DataFluent Contact Form",
							"value": 5,
							"id": "datafluentContactForm",
							"portal": "ContactPage",
							"description": "Send a project note through the protected portfolio contact form."
						}
					]
				}
			]
		},
		{
			"name": "About Me",
			"id": "aboutMe",
			"description": "James Anderegg is a full-stack engineer whose full-time work supports Colorado GEAR UP, a federally funded college access grant program at the Colorado Department of Higher Education. He builds practical data systems, dashboards, automation, and AI-enabled tools that improve reporting, operations, and decision making.",
			"children": [
				{
					"name": "My Playground",
					"id" : "projectsMap",
					"color": "#8E785B",
					"displayText": null,
					"description": "Experimental builds, interactive scenes, dashboards, and visual prototypes where I test ideas before turning them into polished tools.",
					"children": [
						{
							"name": "Playground Projects",
							"value": 5,
							"id": "playgroundProjects",
							"hash": "myplayground",
							"portal": "PlaygroundPage",
							"description": "A focused set of interactive experiments and visual prototypes.",
							"projects": [
								{
									"name": "Tools & Skills",
									"id" : "aboutMap",
									"thumbnail": "/images/tools-skills-preview.svg",
									"description": "Interactive Three.js skills scene presenting development tools, data concepts, and technical experience through animated 3D objects inside the portfolio treemap.",
									"href": "#toolsandskills",
									"actionLabel": "Open project"
								},
								{
									"name": "Night Ski",
									"id" : "nightSki",
									"thumbnail": "/images/night-ski-preview.svg",
									"description": "A playful Three.js night run with drifting tree shadows, glowing headlamps, and animated skiers moving through a compact winter scene.",
									"href": "#nightski",
									"actionLabel": "Open project"
								}
							],
							"children": [
								{
									"name": "Tools & Skills",
									"displayText": null,
									"id" : "aboutMap",
									"component": "About",
									"thumbnail": "/images/tools-skills-preview.svg",
									"description": "An interactive Three.js skills scene that presents tools, data concepts, and development experience through animated 3D objects inside the treemap.",
									"children": [
										{ "name": "Open Tools & Skills", "value": 1,
										"id" : "about"
									 }
									]
								},
								{
									"name": "Night Ski",
									"id" : "nightSki",
									"component": "NightSkiProject",
									"thumbnail": "/images/night-ski-preview.svg",
									"description": "A playful Three.js night run with drifting tree shadows, glowing headlamps, and skiers weaving through the snow.",
									"children": [
										{
											"name": "Night Ski Experience",
											"value": 1,
											"id" : "nightSkiProject"
										}
									]
								}
							]
						}
					]
				},
				{
					"name": "Blog",
					"id" : "blog",
					"color": "#33517F",
					"description": "Notes on software, data systems, creative coding, and lessons from building practical tools for real teams.",
					"children": [
						{
							"name": "Blog Posts",
							"value": 5,
							"id" : "blogPosts",
							"description": "A place for project writeups, technical notes, and reflections on full-stack development, analytics, and AI workflows.",
							"actionLabel": "Read posts"
						}
					]
				},
				{
					"name": "Art Gallery",
					"id": "galleryMap",
					"color": "#B8A78D",
					"description": "A visual archive for sketches, generative pieces, and image experiments that sit outside the main software work.",
					"children":
						[
							{
								"name": "Gallery",
								"value": 5,
								"id" : "artGallery",
								"portal": "ArtGallery"
							}
					]
				},
				{
					"name": "Contact Me",
					"id": "contactMap",
					"color": "#C73B1E",
					"description": "The direct line for project conversations, collaboration ideas, data problems, and practical software work.",
					"actionLabel": "Open form",
					"children": [
						{
							"name": "Contact Form",
							"value": 5,
							"id": "aboutContactForm",
							"portal": "ContactPage",
							"description": "Have a project, workflow problem, dashboard need, or AI idea? Send a note and include the context, timeline, and what a useful first step would look like.",
							"actionLabel": "Send message"
						}
					]
				}
			]
		}
	]
}]

export default pageData;
