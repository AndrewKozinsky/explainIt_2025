import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CreateBookCommand, CreateBookInput } from 'features/book/CreateBook.command'
import { CreateBookChapterCommand, CreateBookChapterInput } from 'features/bookChapter/CreateBookChapter.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class CreateDefaultBookCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(CreateDefaultBookCommand)
export class CreateDefaultBookHandler implements ICommandHandler<CreateDefaultBookCommand> {
	constructor(private commandBus: CommandBus) {}

	async execute(command: CreateDefaultBookCommand) {
		const { userId } = command

		const book = await this.commandBus.execute(new CreateBookCommand(userId, this.getBookData()))
		if (!book) {
			throw new CustomGraphQLError(errorMessage.book.notCreated, ErrorCode.InternalServerError_500)
		}

		const bookChapters = this.getBookChapters(book.id)
		for (const bookChapter of bookChapters) {
			await this.commandBus.execute(new CreateBookChapterCommand(userId, bookChapter))
		}
	}

	getBookData(): CreateBookInput {
		return {
			author: 'Walter Isaacson',
			name: 'Steve Jobs',
			note: 'His tale is instructive and cautionary, filled with lessons about innovation, character, leadership, and values.',
		}
	}

	getBookChapters(bookId: number): CreateBookChapterInput[] {
		return [
			{
				bookId,
				name: 'Chapter 1',
				header: 'ODD COUPLE',
				content: `The Two Steves

While a student in McCollum’s class, Jobs became friends with a graduate who was the teacher’s all-time favorite and a school legend for his wizardry in the class. Stephen Wozniak, whose younger brother had been on a swim team with Jobs, was almost five years older than Jobs and far more knowledgeable about electronics. But emotionally and socially he was still a high school geek.

Like Jobs, Wozniak learned a lot at his father’s knee. But their lessons were different. Paul Jobs was a high school dropout who, when fixing up cars, knew how to turn a tidy profit by striking the right deal on parts. Francis Wozniak, known as Jerry, was a brilliant engineering graduate from Cal Tech, where he had quarterbacked the football team, who became a rocket scientist at Lockheed. He exalted engineering and looked down on those in business, marketing, and sales. “I remember him telling me that engineering was the highest level of importance you could reach in the world,” Steve Wozniak later recalled. “It takes society to a new level.”

One of Steve Wozniak’s first memories was going to his father’s workplace on a weekend and being shown electronic parts, with his dad “putting them on a table with me so I got to play with them.” He watched with fascination as his father tried to get a waveform line on a video screen to stay flat so he could show that one of his circuit designs was working properly. “I could see that whatever my dad was doing, it was important and good.” Woz, as he was known even then, would ask about the resistors and transistors lying around the house, and his father would pull out a blackboard to illustrate what they did. “He would explain what a resistor was by going all the way back to atoms and electrons. He explained how resistors worked when I was in second grade, not by equations but by having me picture it.”

Woz’s father taught him something else that became ingrained in his childlike, socially awkward personality: Never lie. “My dad believed in honesty. Extreme honesty. That’s the biggest thing he taught me. I never lie, even to this day.” (The only partial exception was in the service of a good practical joke.) In addition, he imbued his son with an aversion to extreme ambition, which set Woz apart from Jobs. At an Apple product launch event in 2010, forty years after they met, Woz reflected on their differences. “My father told me, ‘You always want to be in the middle,’” he said. “I didn’t want to be up with the high-level people like Steve. My dad was an engineer, and that’s what I wanted to be. I was way too shy ever to be a business leader like Steve.”

By fourth grade Wozniak became, as he put it, one of the “electronics kids.” He had an easier time making eye contact with a transistor than with a girl, and he developed the chunky and stooped look of a guy who spends most of his time hunched over circuit boards. At the same age when Jobs was puzzling over a carbon microphone that his dad couldn’t explain, Wozniak was using transistors to build an intercom system featuring amplifiers, relays, lights, and buzzers that connected the kids’ bedrooms of six houses in the neighborhood. And at an age when Jobs was building Heathkits, Wozniak was assembling a transmitter and receiver from Hallicrafters, the most sophisticated radios available.

Woz spent a lot of time at home reading his father’s electronics journals, and he became enthralled by stories about new computers, such as the powerful ENIAC. Because Boolean algebra came naturally to him, he marveled at how simple, rather than complex, the computers were. In eighth grade he built a calculator that included one hundred transistors, two hundred diodes, and two hundred resistors on ten circuit boards. It won top prize in a local contest run by the Air Force, even though the competitors included students through twelfth grade.

Woz became more of a loner when the boys his age began going out with girls and partying, endeavors that he found far more complex than designing circuits. “Where before I was popular and riding bikes and everything, suddenly I was socially shut out,” he recalled. “It seemed like nobody spoke to me for the longest time.” He found an outlet by playing juvenile pranks. In twelfth grade he built an electronic metronome—one of those tick-tick-tick devices that keep time in music class—and realized it sounded like a bomb. So he took the labels off some big batteries, taped them together, and put it in a school locker; he rigged it to start ticking faster when the locker opened. Later that day he got called to the principal’s office. He thought it was because he had won, yet again, the school’s top math prize. Instead he was confronted by the police. The principal had been summoned when the device was found, bravely ran onto the football field clutching it to his chest, and pulled the wires off. Woz tried and failed to suppress his laughter. He actually got sent to the juvenile detention center, where he spent the night. It was a memorable experience. He taught the other prisoners how to disconnect the wires leading to the ceiling fans and connect them to the bars so people got shocked when touching them.

Getting shocked was a badge of honor for Woz. He prided himself on being a hardware engineer, which meant that random shocks were routine. He once devised a roulette game where four people put their thumbs in a slot; when the ball landed, one would get shocked. “Hardware guys will play this game, but software guys are too chicken,” he noted.

During his senior year he got a part-time job at Sylvania and had the chance to work on a computer for the first time. He learned FORTRAN from a book and read the manuals for most of the systems of the day, starting with the Digital Equipment PDP-8. Then he studied the specs for the latest microchips and tried to redesign the computers using these newer parts. The challenge he set himself was to replicate the design using the fewest components possible. Each night he would try to improve his drawing from the night before.

By the end of his senior year, he had become a master. “I was now designing computers with half the number of chips the actual company had in their own design, but only on paper.” He never told his friends. After all, most seventeen-year-olds were getting their kicks in other ways.

On Thanksgiving weekend of his senior year, Wozniak visited the University of Colorado. It was closed for the holiday, but he found an engineering student who took him on a tour of the labs. He begged his father to let him go there, even though the out-ofstate tuition was more than the family could easily afford. They struck a deal: He would be allowed to go for one year, but then he would transfer to De Anza Community College back home. After arriving at Colorado in the fall of 1969, he spent so much time playing pranks (such as producing reams of printouts
saying “Fuck Nixon”) that he failed a couple of his Steve Jobs by Walter Isaacson 41 courses and was put on probation. In addition, he created a program to calculate Fibonacci numbers that burned up so much computer time the university threatened to bill him for the cost. So he readily lived up to his bargain with his parents and transferred to De Anza.

After a pleasant year at De Anza, Wozniak took time off to make some money. He found work at a company that made computers for the California Motor Vehicle Department, and a coworker made him a wonderful offer: He would provide some spare chips so Wozniak could make one of the computers he had been sketching on paper. Wozniak decided to use as few chips as possible, both as a personal challenge and because he did not want to take advantage of his colleague’s largesse.`,
			},
			/*{
				bookId,
				name: 'Chapter 3',
				header: 'CHILDHOOD',
				content: ``,
			},*/
		]
	}
}
