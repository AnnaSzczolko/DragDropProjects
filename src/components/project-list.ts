import { autobind} from '../decorators/autobind'
import { Component } from './base-component'
import { DragTarget } from '../models/dragDropInterface'
import { Project , ProjectStatus } from '../models/projectModel'
import { projectState } from '../state/projectState'
import { ProjectItem } from './project-item'

   export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
		assignedProjects: Project[] = []
	
		constructor(private type: 'active' | 'finished') {
			super('project-list', 'app', false, `${type}-projects`)
	
			this.assignedProjects = []
	
			this.configure()
			this.renderContent()
		}
	
		@autobind
		dragOverHandler(event: DragEvent): void {
			if(event.dataTransfer && event.dataTransfer.types[0] ==='text/plain'){
	
				event.preventDefault()
				const listEl = this.element.querySelector('ul')!
				listEl.classList.add('droppable')
	
			}
		}
		@autobind
		dropHandler(event: DragEvent): void {
			const projId = event.dataTransfer!.getData('text/plain')
		projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED)
		
		}
		@autobind
		dropLeaveHandler(event: DragEvent): void {
			const listEl = this.element.querySelector('ul')!
			listEl.classList.remove('droppable')
		}
	
		configure() {
			this.element.addEventListener('dragover', this.dragOverHandler)
			this.element.addEventListener('drop', this.dropHandler)
			this.element.addEventListener('dragleave', this.dropLeaveHandler)
	
			projectState.addListener((projects: Project[]) => {
				const relevantProjects = projects.filter(prj => {
					if (this.type === 'active') {
						return prj.status === ProjectStatus.ACTIVE
					}
					return prj.status === ProjectStatus.FINISHED
				})
	
				this.assignedProjects = relevantProjects
				this.renderProjects()
			})
		}
	
		renderContent() {
			const listId = `${this.type}-project-list`
			this.element.querySelector('ul')!.id = listId
	
			const hTitle = this.type.toUpperCase() + 'PROJECTS'
			this.element.querySelector('h2')!.textContent = hTitle
		}
	
		private renderProjects() {
			const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement
	
			listEl.textContent = ''
	
			for (const projItem of this.assignedProjects) {
				console.log(this.element.id)
	
				new ProjectItem(this.element.querySelector('ul')!.id, projItem)
			}
		}
	}
