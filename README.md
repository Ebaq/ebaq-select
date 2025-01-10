# ebaq-select

Modular easy to customize select.

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
			onSelect={selected => console.log('Selected:', selected)}
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
<Select value={options[0]} onSelect={selected => console.log('Selected:', selected)}>
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
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    //This will work
    console.log('own context selected', selected);
  }, [selected]);

  const onSelect = (option: Option<string>) => {
    // This also will work
    console.log(option.value);
  };

  return (
    <SelectContext.Provider
      value={{
        selected,
        setSelected: setSelected,
        opened,
        setOpened,
        onSelect,
        searchable: true,
        search,
        setSearch,
      }}
    >
      <Select<string>
        onSelect={() => {
          // This won't work
          console.log('on Select');
        }}
      >
        <SelectTrigger>
          {({ selected }) => (
            <span>{selected?.label || 'Select an option'}</span>
          )}
        </SelectTrigger>
        <SelectContent>
          {searchOptions
            .filter((el) =>
              el.label.toLowerCase().includes(search.toLowerCase())
            )
            .map((option) => (
              <SelectOption
                key={option.value}
                value={option}
                className="option"
              >
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

[data-hasselected] means that any option is selected

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

To use this you need to give a class to <SelectOption>

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
	onSelect={selected => console.log('Selected:', selected)}
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
      onSelect={(option) => console.log(option)}
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

### Unstable

Virtualized select available but not stable yet. Example:

```
export const VirtualizedBeta = () => {
  const [selectedOption, setSelectedOption] = useState<Option<number>>();

  const handleSelect = (option: Option<number>) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    //This will work
    console.log('own context selected', selectedOption);
  }, [selectedOption]);

  const options = Array.from({ length: 1000 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
  }));

  const renderCustomOption = (
    option: Option<number>,
    isSelected: boolean,
    onClick: () => void
  ) => (
    <div
      onClick={onClick}
      style={{
        padding: '10px',
        background: isSelected ? 'lightgreen' : 'white',
        cursor: 'pointer',
        backgroundColor: '#000',
        borderBottom: '1px solid #ddd',
      }}
    >
      <strong>{option.label}</strong>
    </div>
  );

  return (
    <VirtualizedSelect
      value={selectedOption}
      onSelect={handleSelect}
      options={options}
      height={300}
      style={{
        minWidth: 300,
      }}
      itemHeight={45}
      renderOption={renderCustomOption}
    >
      <VirtualizedTrigger
        style={{
          minWidth: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #fefefe',
          borderRadius: 8,
          padding: '10px 0',
        }}
      >
        {({ selected }) => <span>{selected?.label || 'Select an option'}</span>}
      </VirtualizedTrigger>
    </VirtualizedSelect>
  );
};
```

You can look closer and test it in storybook.
Open to critic and contributing!

## API Reference

#### SelectContext Props

| Prop  | Type   | Description                                  |
| :---- | :----- | :------------------------------------------- |
| value | Object | **Required**. Props for context to work with |

#### Value Props

| Prop        | Type      | Description                      |
| :---------- | :-------- | :------------------------------- |
| selected    | Option<T> | **Required**. Selected value     |
| setSelected | func      | **Required**. Set selected value |
| opened      | boolean   | **Required**. Is select opened   |
| onSelect    | func      | Action when selecting option     |
| searchable  | boolean   | Is search input enabled          |
| search      | string    | Search string                    |
| setSearch   | func      | Set search string when typing    |

#### Select Props

| Parameter        | Type      | Description                     |
| :--------------- | :-------- | :------------------------------ |
| children         | ReactNode | SelectTrigger and SelectContent |
| value            | Option<T> | Predefined value if need        |
| onSelect         | func      | Action when selecting option    |
| className        | string    | Classes for select              |
| wrapperClassName | string    | Classes for select wrapper      |
| style            | string    | Style for select                |
| wrapperStyle     | string    | Style for select wrapper        |

#### SelectTrigger Props

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| children  | func   | Customizable placeholder, provides context |
| className | string | Classes for placeholder                    |
| style     | string | Style for placeholder                      |

#### SelectContent Props

| Parameter       | Type      | Description                           |
| :-------------- | :-------- | :------------------------------------ |
| children        | ReactNode | Options                               |
| className       | string    | Classes for options wrapper           |
| style           | string    | Style for options wrapper             |
| searchStyle     | string    | Style for search input if enabled     |
| searchClassName | string    | Classname for search input if enabled |

#### Option Props

| Parameter | Type      | Description                                      |
| :-------- | :-------- | :----------------------------------------------- |
| value     | Option<T> | Value of provided option to handle select e.t.c. |
| children  | func      | Custom option view with provided context         |
| style     | string    | Style for option                                 |
| className | string    | Classname for option                             |

TODO: MultiSelect and VirtualizedSelect API Reference
