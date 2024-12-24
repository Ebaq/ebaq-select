# ebaq-select

This library built like shadcn, so you can customize your select as you want.

## Examples

```typescript
const options = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
]
export const Example = () => {

	return (
		<Select
			onChange={selected => console.log('Selected:', selected)}
		>
			<SelectTrigger className={'selected'}>
				{({ selected }: { selected: Option<string> }) => (
					<span>{selected?.label || 'Choose an option'}</span>
				)}
			</SelectTrigger>
			<SelectContent>
				{options.map(option => (
					<SelectOption key={option.value} value={option} className='option'>
						{selected => <span>{option.label}</span>}
					</SelectOption>
				))}
			</SelectContent>
		</Select>
	)
}
```

With predefined value:

```typescript
<Select value={options[0]} onChange={selected => console.log('Selected:', selected)}>
	<SelectTrigger className={'selected'}>
		{({ selected }: { selected: Option<string> }) => (
			<span>{selected?.label || 'Choose an option'}</span>
		)}
	</SelectTrigger>
	<SelectContent>
		{options.map(option => (
			<SelectOption key={option.value} value={option} className='option'>
				{selected => <span>{option.label}</span>}
			</SelectOption>
		))}
	</SelectContent>
</Select>
```

### Styles

You can customize options with 2 data attributes:

[data-selected] means that this option is selected

[data-hasselected] means that any option is selected

With that you can style not selected and selected options like this:

```css
/* This style is for selected option to highlight it */
.option[data-selected='true'] {
  background-color: #213547;
}

/* This style is for not selected option, for example to make them less bright */
.option[data-selected='false'][data-hasselected='true'] {
  color: #fefefe4d;
}
```

To you this, you need to give a class to <SelectOption>

Select width adaptive to its content and height is static. This example:

```
const options = [
	{
		label: 'test1234567890',
		value: 'test1',
	},
	{
		label: 'test1234567890',
		value: 'test2',
	},
	{
		label: 'test123456789012345678901234567890',
		value: 'test3',
	},
]
```

will render like this:

![Example](https://i.imgur.com/WHQg18Y.png)

if you want to make it change width you can simply just use inline styles on select or select wrapper or set class with `!important`.

If you want to change height of placeholder you'll need to change min-height value in `Select` and `SelectTrigger`. Example:

```
const options = [
	{
		label: 'test1234567890 test1234567890',
		value: 'test1',
	},
	{
		label: 'test1234567890',
		value: 'test2',
	},
	{
		label: 'test1234567890123456789',
		value: 'test3',
	},
]

```

```
<Select
	wrapperClassName='wrapper'
	value={options[0]}
	style={{
		textWrap: 'wrap',
		minHeight: 60,
	}}
	onChange={selected => console.log('Selected:', selected)}
>
	<SelectTrigger
		className={'selected'}
		style={{
			minHeight: 60,
		}}
	>
		{({ selected }: { selected: Option<string> }) => (
			<span>{selected?.label || 'Choose an option'}</span>
		)}
	</SelectTrigger>
	<SelectContent>
		{options.map(option => (
			<SelectOption key={option.value} value={option} className='option'>
				{() => <span>{option.label}</span>}
			</SelectOption>
		))}
	</SelectContent>
</Select>
```

This code looks like this:

![Example](https://i.imgur.com/QPPUftR.png)

![Example](https://i.imgur.com/QTjhoXm.png)
