import { Component } from './base-component'
import { autobind} from '../decorators/autobind'
import { Draggable } from '../models/dragDropInterface'
import { Project } from '../models/projectModel'


   export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
		private project: Project
	
		get numOfPeople() {
			if (this.project.people > 1) {
				return `${this.project.people} Persons`
			} else {
				return `${this.project.people} Person`
			}
		}
	
		constructor(hostId: string, project: Project) {
			super('single-project', hostId, false, project.id)
			this.project = project
	
			this.configure()
			this.renderContent()
		}
	
		@autobind
		dragStartHandler(event: DragEvent): void {
			event.dataTransfer!.setData('text/plain', this.project.id)
			event.dataTransfer!.effectAllowed = 'move'
		}
	
		@autobind
		dragEndHandler(event: DragEvent): void {
			console.log('end')
		}
	
		configure() {
			this.element.addEventListener('dragstart', this.dragStartHandler)
			this.element.addEventListener('dragend', this.dragEndHandler)
		}
	
		renderContent() {
	
			this.element.querySelector('h2')!.textContent = this.project.title
			this.element.querySelector('h3')!.textContent = this.numOfPeople + ' assigned'
			this.element.querySelector('p')!.textContent = this.project.description
		}
	}
