import { Component } from './base-component'
import { autobind} from '../decorators/autobind'
import { ValidateStructure, validate } from '../util/validate'
import { projectState } from '../state/projectState'

   export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
		titleInputElement: HTMLInputElement
		descriptionInputElement: HTMLTextAreaElement

		peopleInputElement: HTMLInputElement
		button: HTMLButtonElement
	
		constructor() {
			super('project-input', 'app', true, 'user-input')
	
			this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
			this.descriptionInputElement = this.element.querySelector('#description') as HTMLTextAreaElement

			this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
			this.button = this.element.querySelector('button') as HTMLButtonElement
	
			this.configure()
		}
	
		configure() {
			this.element.addEventListener('submit', this.submitHandler)
		}
	
		renderContent() {}
	
		private gatherUserInput(): [string, string, number] | void {
			const enteredTitle = this.titleInputElement.value
			const enteredDescription = this.descriptionInputElement.value
			const enteredPeople = +this.peopleInputElement.value
	
			const titleValidatable: ValidateStructure = {
				value: enteredTitle,
				required: true,
			}
	
			const descriptionValidatable: ValidateStructure = {
				value: enteredDescription,
				required: true,
				minLength: 5,
			}
			const peopleValidatable: ValidateStructure = {
				value: +enteredPeople,
				required: true,
				min: 1,
				max: 5,
			}
	
			if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
				alert('wrong data')
				return
			} else {
				return [enteredTitle, enteredDescription, enteredPeople]
			}
		}
	
		private clearInputs() {
			this.titleInputElement.value = ''
			this.descriptionInputElement.value = ''
			this.peopleInputElement.value = ''
		}
	
		@autobind
		private submitHandler(event: Event) {
			event.preventDefault()
	
			const userInput = this.gatherUserInput()
	
			if (Array.isArray(userInput)) {
				const [title, desc, people] = userInput
				projectState.addProject(title, desc, people)
				this.clearInputs()
			}
		}
	}
