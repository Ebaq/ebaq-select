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
		<SelectWrapper>
			<Select<string> onChange={option => console.log(option)}>
				<SelectTrigger>
					{({ selected }) => (
						<span>{selected?.label || 'Select an option'}</span>
					)}
				</SelectTrigger>
				<SelectContent>
					{options.map(option => (
						<SelectOption key={option.value} value={option}>
							{selected => (
								<div
									style={{
										backgroundColor:
											selected?.value == option.value
												? '#80cbc4'
												: 'transparent',
										padding: '0.75rem',
									}}
								>
									<span>{option.label}</span>
								</div>
							)}
						</SelectOption>
					))}
				</SelectContent>
			</Select>
		</SelectWrapper>
	)
}
```

With predefined value:

```typescript
<SelectWrapper>
	<Select
			value={options[0]} // Here we setting option that we need
			onChange={selected => console.log('Selected:', selected)}
	>
		<SelectTrigger>
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
</SelectWrapper>
```

### Styles

You can customize options with 2 data attributes:

[data-selected] means that this option is selected

[data-hasSelected] means that any option is selected

With that you can style not selected and selected options like this:

```css
/* This style is for selected option to highlight it */
.option[data-selected='true'] {
  background-color: #213547;
}

/* This style is for not selected option, for example to make them less bright */
.option[data-selected='false'][data-hasSelected='true'] {
  color: #fefefe4d;
}
```

To you this, you need to give a class to <SelectOption>
