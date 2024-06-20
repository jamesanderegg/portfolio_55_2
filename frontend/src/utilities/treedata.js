import React from 'react';
import CoverPage from "../Components/CoverPage/CoverPage";

const pageData = [{
	"name": "Portfolio",
	"children": [
		{
			"name": "Welcome",
			"id" : "datafluent",
			"displayText": "A cover page.",
			"component": <CoverPage />,
			"children": [
				{
					"name": "Tools & Skills",
					"displayText": null,
					"id" : "aboutMap",
					"component": "About",
					"children": [
						{ "name": "File", "value": "cgi-1.jpg",
						"id" : "about"
					 }
					]
				},
				{
					"name": "Projects",
					"id" : "projectsMap",
					"displayText": null,
					"children": [
						{ "name": "text", "value": "cgi-1.jpg",
						"id" : "projects", }
					]
				},
				{
					"name": "Blog",
					"id" : "blog",
					"children": [
						{ "name": "File", "value": "cgi-1.jpg",
						"id" : "resume", }
					]
				},
				{
					"name": "Art Gallery",
					"id": "gallery",
					"children":
						[
							{ "name": "text", "value": "cgi-1.jpg",
						"id" : "projects", }
					]
				}
			]
		}
	]
}]

export default pageData;