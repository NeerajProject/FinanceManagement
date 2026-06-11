import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function FilterBuilder({
    fields,
    onSearch,
}) {
    const [rules, setRules] = useState([
        {
            field: '',
            operator: '=',
            value: '',
        },
    ]);

    const addRule = () => {
        setRules([
            ...rules,
            {
                field: '',
                operator: '=',
                value: '',
            },
        ]);
    };

    const removeRule = (index) => {
        setRules(
            rules.filter(
                (_, i) => i !== index
            )
        );
    };

    const updateRule = (
        index,
        key,
        value
    ) => {
        const newRules = [...rules];

        newRules[index][key] = value;

        setRules(newRules);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">

            <div className="px-6 py-4 border-b">
                <h2 className="font-semibold text-lg">
                    Custom Filter
                </h2>
            </div>

            <div className="p-6 space-y-4">

                <div className="text-sm text-gray-600">
                    Match any of the following rules
                </div>

                {rules.map(
                    (rule, index) => (
                        <div
                            key={index}
                            className="
                                grid
                                grid-cols-12
                                gap-3
                                items-center
                            "
                        >
                            {/* Field */}

                            <select
                                value={rule.field}
                                onChange={(e) =>
                                    updateRule(
                                        index,
                                        'field',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    col-span-4
                                    border
                                    rounded
                                    px-3
                                    py-2
                                "
                            >
                                <option value="">
                                    Select Field
                                </option>

                                {fields.map(
                                    (
                                        field
                                    ) => (
                                        <option
                                            key={
                                                field.value
                                            }
                                            value={
                                                field.value
                                            }
                                        >
                                            {
                                                field.label
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {/* Operator */}

                            <select
                                value={
                                    rule.operator
                                }
                                onChange={(e) =>
                                    updateRule(
                                        index,
                                        'operator',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    col-span-3
                                    border
                                    rounded
                                    px-3
                                    py-2
                                "
                            >
                                <option value="=">
                                    Equal To
                                </option>

                                <option value="!=">
                                    Not Equal
                                </option>

                                <option value="contains">
                                    Contains
                                </option>

                                <option value="starts_with">
                                    Starts With
                                </option>

                                <option value="ends_with">
                                    Ends With
                                </option>

                                <option value=">">
                                    Greater Than
                                </option>

                                <option value="<">
                                    Less Than
                                </option>
                            </select>

                            {/* Value */}

                            <input
                                value={
                                    rule.value
                                }
                                onChange={(e) =>
                                    updateRule(
                                        index,
                                        'value',
                                        e.target
                                            .value
                                    )
                                }
                                className="
                                    col-span-4
                                    border
                                    rounded
                                    px-3
                                    py-2
                                "
                                placeholder="Value"
                            />

                            {/* Delete */}

                            <button
                                onClick={() =>
                                    removeRule(
                                        index
                                    )
                                }
                                className="
                                    col-span-1
                                    text-red-500
                                "
                            >
                                <Trash2
                                    size={18}
                                />
                            </button>

                        </div>
                    )
                )}

                <button
                    onClick={addRule}
                    className="
                        flex
                        items-center
                        gap-2
                        text-blue-600
                        font-medium
                    "
                >
                    <Plus size={16} />
                    New Rule
                </button>

            </div>

            <div className="border-t p-4 flex gap-3">

                <button
                    onClick={() =>
                        onSearch(rules)
                    }
                    className="
                        bg-purple-700
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                >
                    Search
                </button>

                <button
                    className="
                        bg-gray-100
                        px-4
                        py-2
                        rounded
                    "
                >
                    Discard
                </button>

            </div>

        </div>
    );
}