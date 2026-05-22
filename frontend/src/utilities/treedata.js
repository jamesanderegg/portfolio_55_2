const pageData = [{
	"name": "Portfolio",
	"children": [
		{
			"name": "DataFluent LLC",
			"hash": "datafluent",
			"id" : "datafluent",
			"description": "Custom web applications, reporting systems, practical AI tools, and operations platforms for organizations that need their data to actually work.",
			"component": "CoverPage",
			"children": [
				{
					"name": "Web Applications & Data Systems",
					"id": "webApplicationsDataSystems",
					"description": "Secure portals, CMS-powered websites, dashboards, reporting tools, databases, and backend systems built around real business needs.",
					"actionLabel": "View projects",
					"children": [
						{
							"name": "SNOC",
							"id": "snocWebsite",
							"value": 1,
							"thumbnail": "/images/snoc-website-preview.png",
							"description": "CMS-powered website built with Sanity.io for The School of the Natural Order - CO Chapter.",
							"href": "https://snoc.org",
							"actionLabel": "Visit site"
						},
						{
							"name": "Hexagon Art",
							"id": "hexagonArtWebsite",
							"value": 1,
							"thumbnail": "/images/hexagon-art-website-preview.png",
							"description": "CMS-powered artist website built with Sanity.io for Jeff Richards and the Hexagonart archive.",
							"href": "https://www.hexagonart.com/",
							"actionLabel": "Visit site"
						}
					]
				},
				{
					"name": "AI, RAG & Workflow Automation",
					"id": "aiRagWorkflowAutomation",
					"value": "ai-rag-workflow-automation",
					"description": "Private document search, local LLM tools, AI-assisted workflows, and automations that reduce repetitive work.",
					"actionLabel": "View projects"
				},
				{
					"name": "Contact DataFluent",
					"id": "datafluentContactMap",
					"color": "#AC473D",
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
					"color": "#BDA877",
					"displayText": null,
					"description": "Experimental builds, interactive scenes, dashboards, and visual prototypes where I test ideas before turning them into polished tools.",
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
						},
						{
							"name": "Portfolio Rebuild",
							"value": 1,
							"id" : "portfolioRebuild",
							"description": "A rebuild of the portfolio experience around interactive visual navigation and project-focused pages."
						},
						{
							"name": "Data Dashboard",
							"value": 1,
							"id" : "dataDashboard",
							"description": "Dashboard and reporting experiments for turning raw data into usable views."
						},
						{
							"name": "Visualization Lab",
							"value": 1,
							"id" : "visualizationLab",
							"description": "Explorations in visualizing complex information with web-native interaction."
						}
					]
				},
				{
					"name": "Blog",
					"id" : "blog",
					"color": "#8E897D",
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
					"color": "#D5CFC0",
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
					"color": "#AC473D",
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
