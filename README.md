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
