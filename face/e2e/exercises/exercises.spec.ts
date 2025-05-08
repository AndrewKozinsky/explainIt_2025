import { test, expect } from '@playwright/test'
import pagesUrls from '../utils/pagesUrls'
import { graphQLRequestsData, mockGraphQLRequest } from '../utils/routeMocks'
import { exercisesTestIds } from './exercisesTestIds'

test.beforeEach(async ({ page }) => {
	await page.goto(pagesUrls.article1)
})

test('has 2 exercises blocks', async ({ page }) => {
	const $exercises = page.getByTestId(exercisesTestIds.exercises)
	await expect($exercises).toHaveCount(2)
})

test('the first exercises block has 3 sentences, the second one has 5', async ({ page }) => {
	const $exercises = page.getByTestId(exercisesTestIds.exercises)
	const exercisesCount = await $exercises.count()

	for (let i = 0; i < exercisesCount; i++) {
		const $exercisesListItems = $exercises.nth(i).getByTestId(exercisesTestIds.exercisesListItem)
		const listItemsCount = await $exercisesListItems.count()

		const mapper: Record<number, number> = {
			0: 3,
			1: 5,
		}

		expect(listItemsCount).toBe(mapper[i])
	}
})

test('after a user clicked the second sentence of the first exercises block, the second exercises block should not change', async ({
	page,
}) => {
	const $allExerciseBlock = page.getByTestId(exercisesTestIds.exercises)
	const $exerciseBlockOne = $allExerciseBlock.nth(0)
	const $exerciseBlockTwo = $allExerciseBlock.nth(1)

	// Click on the second exercise on the first exercises block
	await $exerciseBlockOne.getByTestId(exercisesTestIds.exercisesListItem).nth(1).click()

	// Check that the first sentence is selected in the second exercises block
	const $exerciseBlockTwoFirstSentence = $exerciseBlockTwo.getByTestId(exercisesTestIds.exercisesListItem).nth(0)
	await expect($exerciseBlockTwoFirstSentence).toHaveClass('switcher__button switcher__button--current')

	// The exercise on the second exercises block should not change
	const exerciseBlockTwoRusSentence = await $exerciseBlockTwo
		.getByTestId(exercisesTestIds.exerciseContentRusSentenceText)
		.textContent()

	expect(exerciseBlockTwoRusSentence).toBe('Я работаю.')
})

test('after a user clicked on the second sentence the exercises block should show content of the second exercise', async ({
	page,
}) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Click on the second exercise
	await $exercisesBlock.getByTestId(exercisesTestIds.exercisesListItem).nth(1).click()

	// Check that the first sentence in the left list doesn't have a selected class
	const $firstItemInSentencesList = $exercisesBlock.getByTestId(exercisesTestIds.exercisesListItem).nth(0)
	await expect($firstItemInSentencesList).toHaveClass('switcher__button')

	// Check that the second sentence in the left list have a selected class
	const $secondItemInSentencesList = $exercisesBlock.getByTestId(exercisesTestIds.exercisesListItem).nth(1)
	await expect($secondItemInSentencesList).toHaveClass('switcher__button switcher__button--current')

	// The Russian sentence should change
	const $rusSentence = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentRusSentenceText)
	expect(await $rusSentence.textContent()).toBe('Они обожают зелёный чай.')

	// Action button should show text "Правильный вариант"
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	expect(await $actionButton.textContent()).toBe('Правильный вариант')
})

test('after a user clicks on the button «Правильный вариант» the correct answers are show and the button changes its text', async ({
	page,
}) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Click to the action button
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	await $actionButton.click()

	// Check that 3 correct translations are show
	const $exerciseCorrectTranslations = $exercisesBlock.getByTestId(exercisesTestIds.exerciseCorrectTranslationsItem)
	expect(await $exerciseCorrectTranslations.count()).toBe(3)
})

test('if a user type some text in translate input then button «Правильный вариант» changes to «Проверить».', async ({
	page,
}) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Get the English translate textarea and type some text
	const $engTextarea = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentEngSentenceText)
	await $engTextarea.fill('some translation')

	// The text of the action button should change
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	expect(await $actionButton.textContent()).toBe('Проверить')

	// User erase all characters in the English translate textarea
	await $engTextarea.fill('')

	// The text of the action button should return to the initial state
	expect(await $actionButton.textContent()).toBe('Правильный вариант')
})

test('if a user type incorrect translation and analysis exists', async ({ page }) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Get the English translation textarea and type an incorrect translation
	const $engTextarea = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentEngSentenceText)
	await $engTextarea.fill('I likes green tea')

	// Check translation by click on the action button
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	await $actionButton.click()

	// Textarea with translation should have red text
	await expect($engTextarea).toHaveClass('eng-translate-input eng-translate-input--red-text')

	// Analysis block should appear
	const $analysisBlock = $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisBlock)
	await expect($analysisBlock).toBeVisible()
})

test('if a user type correct translation and analysis exists', async ({ page }) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Get the English translation textarea and type a correct translation
	const $engTextarea = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentEngSentenceText)
	await $engTextarea.fill('I adore green tea')

	// Check translation by click on the action button
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	await $actionButton.click()

	// Textarea with translation should have green text
	await expect($engTextarea).toHaveClass('eng-translate-input eng-translate-input--green-text')

	// Analysis block should appear
	const $analysisBlock = $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisBlock)
	await expect($analysisBlock).toBeVisible()
})

test('if a user type translation and analysis does not exist', async ({ page }) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Get the English translation textarea and type a correct translation
	const $engTextarea = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentEngSentenceText)

	// User will type translation in each iteration.
	// The server every type will send different response: error, wrong translation, correct translation
	// Exercises block must properly react to each response.
	for (let i = 0; i < 3; i++) {
		// What type user must type in translation textarea
		const translationTextMapper: Record<number, string> = {
			0: 'error translation',
			1: 'wrong translation',
			2: 'correct translation',
		}
		await $engTextarea.fill(translationTextMapper[i])

		// What data the server must sent
		const checkTranslationResponseMapper: Record<number, any> = {
			0: graphQLRequestsData.AICheckTranslation.data.error(),
			1: graphQLRequestsData.AICheckTranslation.data.wrongTranslation(),
			2: graphQLRequestsData.AICheckTranslation.data.correctTranslation(),
		}
		await mockGraphQLRequest(page, graphQLRequestsData.AICheckTranslation, checkTranslationResponseMapper[i], 1000)

		// Check translation by click on the action button
		const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
		await $actionButton.click()

		// Loading block must appear
		const $analysisLoadingBlock = $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisLoadingBlock)
		await expect($analysisLoadingBlock).toBeVisible()

		// Depends on server response special block must appear
		const exercisesBlockMapper: Record<number, any> = {
			0: $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisErrorBlock),
			1: $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisBlock),
			2: $exercisesBlock.getByTestId(exercisesTestIds.exerciseAnalysisBlock),
		}
		await expect(exercisesBlockMapper[i]).toBeVisible()

		// Textarea with translation should have specific classes depends on server response
		const classesMapper: Record<number, string> = {
			0: 'eng-translate-input',
			1: 'eng-translate-input eng-translate-input--red-text',
			2: 'eng-translate-input eng-translate-input--green-text',
		}
		await expect($engTextarea).toHaveClass(classesMapper[i])
	}
})

test('after a user moved to the last sentence and get analysis the action button should open the first sentence of the oral exercises', async ({
	page,
}) => {
	const $exercisesBlock = page.getByTestId(exercisesTestIds.exercises).nth(0)

	// Click on the last exercise
	await $exercisesBlock.getByTestId(exercisesTestIds.exercisesListItem).nth(2).click()

	// Show correct translations
	const $actionButton = $exercisesBlock.getByTestId(exercisesTestIds.exerciseActionButton)
	await $actionButton.click()

	// Click the action button one more time to move to the oral sentences
	await $actionButton.click()

	// Check that exercise type switcher changed
	const $exerciseTypeSwitchers = $exercisesBlock.getByTestId(exercisesTestIds.exerciseTypeSwitchItem)
	expect($exerciseTypeSwitchers.nth(0)).toHaveClass(
		'exercises-type-switch__item exercises-type-switch__item--another',
	)
	expect($exerciseTypeSwitchers.nth(1)).toHaveClass(
		'exercises-type-switch__item exercises-type-switch__item--current',
	)

	// Check that the first sentence in the left list has a selected class
	const $firstItemInSentencesList = $exercisesBlock.getByTestId(exercisesTestIds.exercisesListItem).nth(0)
	await expect($firstItemInSentencesList).toHaveClass('switcher__button switcher__button--current')

	// The Russian sentence should change
	const $rusSentence = $exercisesBlock.getByTestId(exercisesTestIds.exerciseContentRusSentenceText)
	expect(await $rusSentence.textContent()).toBe('Я обожаю зелёный чай.')

	// Action button should show text "Правильный вариант"
	expect(await $actionButton.textContent()).toBe('Правильный вариант')
})
