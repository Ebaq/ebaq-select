# ebaq-select

This library built like shadcn, so you can customize your select as you want.

## Examples

### Default

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

### With predefined value:

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

### With own context

```
export const WithContext = () => {
  const [selected, setSelected] = useState<Option<string> | null>(null);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    console.log('own context selected', selected);
  }, [selected]);

  return (
    <SelectContext.Provider
      value={{ selected, setSelected: setSelected, opened, setOpened }}
    >
      <Select<string> onSelect={() => {}}>
        <SelectTrigger>
          {({ selected }) => (
            <span>{selected?.label || 'Select an option'}</span>
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectOption key={option.value} value={option} className="option">
              {() => <div>{option.label}</div>}
            </SelectOption>
          ))}
        </SelectContent>
      </Select>
    </SelectContext.Provider>
  );
};
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

Supports Multielect, example:

```
export const Multi = () => {
  return (
    <MultiSelect<string>
      onChange={(option) => console.log(option)}
      style={{
        width: 200,
      }}
    >
      <MultiSelectTrigger
        style={{
          width: 180,
        }}
      >
        {({ selected, opened }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {selected.length > 0
                ? selected.map((option, index) =>
                    index == 0 ? (
                      <span key={option.value}>{option.label}</span>
                    ) : (
                      <span key={option.value}>, {option.label}</span>
                    )
                  )
                : 'Select options'}{' '}
            </div>
            <ChevronDownSVG isOpen={opened} />
          </div>
        )}
      </MultiSelectTrigger>
      <MultiSelectContent>
        {options.map((option) => (
          <MultiSelectOption
            key={option.value}
            value={option}
            className="option"
          >
            {({ isSelected }) => (
              <div>
                <span>{option.label}</span> {isSelected && <span>{'✔️'}</span>}
              </div>
            )}
          </MultiSelectOption>
        ))}
      </MultiSelectContent>
    </MultiSelect>
  );
};
```

You can look closer and test it in storybook.
