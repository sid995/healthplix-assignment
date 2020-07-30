// let data = {
// 	diagnosis: [
// 		{
// 			id: 1,
// 			label: 'a',
// 			selected: false,
// 		},
// 		{
// 			id: 2,
// 			label: 'b',
// 			selected: true,
// 		},
// 		{
// 			id: 3,
// 			label: 'c',
// 			selected: false,
// 		},
// 		{
// 			id: 4,
// 			label: 'd',
// 			selected: false,
// 		},
// 		{
// 			id: 5,
// 			label: 'e',
// 			selected: false,
// 		},
// 	],
// 	new: [
// 		{
// 			id: 1,
// 			label: 'a',
// 			selected: true,
// 		},
// 		{
// 			id: 2,
// 			label: 'b',
// 			selected: true,
// 		},
// 		{
// 			id: 3,
// 			label: 'c',
// 			selected: false,
// 		},
// 		{
// 			id: 4,
// 			label: 'd',
// 			selected: false,
// 		},
// 		{
// 			id: 5,
// 			label: 'e',
// 			selected: false,
// 		},
// 	],
// }

let data = {}

let categoryHtml = ''

const capitalizeString = ([firstLetter, ...rest]) => {
	return firstLetter.toUpperCase() + rest.join('')
}

const selectOnClick = (key, id) => {
	const formatKey = key.trim()
	data[formatKey].filter((d) => d.id === id)[0].selected = true
	getTypesOfCategories()
}

const deleteSelectedType = (key, id) => {
	const formatKey = key.trim()
	data[formatKey].filter((d) => d.id === id)[0].selected = false
	getTypesOfCategories()
}

const valueInput = (el, event, key) => {
	if (event.keyCode !== 188) {
		return
	}
	const newObj = {
		id: data[key].length + 1,
		label: el.value,
		selected: true,
	}
	data[key].push(newObj)
	el.value = ''
	const id = el.id
	document.getElementById(id).focus()
	getTypesOfCategories()
}

const getTypesOfCategories = () => {
	for (const key in data) {
		populateTypesOfCategory(key)
	}
	document.getElementById('category-list').innerHTML = categoryHtml
	categoryHtml = ''
}

const populateTypesOfCategory = (key) => {
	const elements = data[key]
	let types, selectedTypes

	if (elements.length !== 0) {
		types = data[key]
			.filter((d) => !d.selected)
			.map((d) => {
				return `<span class="category-sequence--option-to-select" onclick="selectOnClick('${key}', ${d.id})">${d.label}</span>`
			})
			.join('')

		selectedTypes = data[key]
			.filter((d) => d.selected)
			.map((d) => {
				return `<span class="selected-category"><span onclick="deleteSelectedType('${key}', ${d.id})">X</span> ${d.label}</span>`
			})
			.join('')
	} else {
		return `<div>Add categories for ${key}/div>`
	}

	categoryHtml += `<div class="category-container">
                    <p class="category--label">${capitalizeString(key)}:</p>
                    <div class="category-sequence">
                      <div class="category-sequence--top">
                        <div class="category-sequence--top-input">
                          <div class="category-option-selected-list">
                            ${selectedTypes}
                          </div>
                          <div class="category-input-addition">
                            <input placeholder="Tap to choose ${key}" id="${key}-id" onkeydown="valueInput(this, event, '${key}')" />
                          </div>
                        </div>
                      </div>
                      <div class="category-sequence--bottom">
                        ${types}
                      </div>
                    </div>
                  </div>`
}

const addNewCategories = () => {
	const categoryInput = document.getElementById('category-input')
	if (categoryInput.value === '' || categoryInput.value === null) {
		alert('New category input cannot be empty')
		return
	}
	const typesInput = document.getElementById('types-input')
	let newTypeValues = typesInput.value.split(',')
	let newTypes = []
	newTypeValues.map((val) => {
		let newObj = {
			id: newTypeValues.length + 1,
			label: val.trim(),
			selected: false,
		}
		newTypes.push(newObj)
	})

	data = { ...data, [categoryInput.value]: newTypes }

	getTypesOfCategories()
}

;(() => {
	getTypesOfCategories()
})()
