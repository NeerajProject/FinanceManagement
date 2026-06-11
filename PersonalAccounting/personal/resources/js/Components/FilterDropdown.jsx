import { useState } from 'react';
import {
    Plus,
    Trash2,
    X,
} from 'lucide-react';

export default function FilterDropdown({
    fields,
    onApply,
    onClose,
}) {
    const [condition, setCondition] =
        useState('and');

    const [rules, setRules] =
        useState([
            {
                field:
                    fields[0]?.value || '',
                operator:
                    'contains',
                value: '',
            },
        ]);

    const addRule = () => {
        setRules([
            ...rules,
            {
                field:
                    fields[0]?.value || '',
                operator:
                    'contains',
                value: '',
            },
        ]);
    };

    const updateRule = (
        index,
        key,
        value
    ) => {
        const copy = [...rules];
        copy[index][key] = value;
        setRules(copy);
    };

    const removeRule = (index) => {
        setRules(
            rules.filter(
                (_, i) => i !== index
            )
        );
    };

    return (
        <div
            className="
                fixed inset-0
                bg-black/20
                z-50
            "
        >
            <div
                className="
                    absolute
                    top-20
                    left-1/2
                    -translate-x-1/2
                    bg-white
                    w-[850px]
                    rounded-lg
                    shadow-xl
                "
            >

                <div
                    className="
                        flex
                        justify-between
                        p-4
                        border-b
                    "
                >
                    <h3 className="font-semibold">
                        Custom Filter
                    </h3>

                    <button
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="p-5">

                    <div className="mb-5">

                        Match

                        <select
                            value={
                                condition
                            }
                            onChange={(e) =>
                                setCondition(
                                    e.target
                                        .value
                                )
                            }
                            className="
                                mx-2
                                border
                                rounded
                                px-2
                            "
                        >
                            <option value="and">
                                All
                            </option>

                            <option value="or">
                                Any
                            </option>

                        </select>

                        of the following
                        rules

                    </div>

                    {rules.map(
                        (
                            rule,
                            index
                        ) => (
                            <div
                                key={
                                    index
                                }
                                className="
                                    grid
                                    grid-cols-12
                                    gap-3
                                    mb-3
                                "
                            >

                                <select
                                    value={
                                        rule.field
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        updateRule(
                                            index,
                                            'field',
                                            e
                                                .target
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

                                <select
                                    value={
                                        rule.operator
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        updateRule(
                                            index,
                                            'operator',
                                            e
                                                .target
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
                                    <option value="contains">
                                        Contains
                                    </option>
                                    <option value="=">
                                        Equal
                                    </option>
                                    <option value="!=">
                                        Not Equal
                                    </option>
                                    <option value=">">
                                        Greater
                                    </option>
                                    <option value="<">
                                        Less
                                    </option>
                                </select>

                                <input
                                    value={
                                        rule.value
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        updateRule(
                                            index,
                                            'value',
                                            e
                                                .target
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
                                />

                                <button
                                    onClick={() =>
                                        removeRule(
                                            index
                                        )
                                    }
                                >
                                    <Trash2
                                        size={
                                            18
                                        }
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
                            mt-4
                        "
                    >
                        <Plus size={16} />
                        Add Condition
                    </button>

                </div>

                <div
                    className="
                        border-t
                        p-4
                        flex
                        gap-3
                    "
                >
                    <button
                        onClick={() =>
                            onApply({
                                condition,
                                filters:
                                    rules,
                            })
                        }
                        className="
                            bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Apply
                    </button>

                    <button
                        onClick={onClose}
                        className="
                            border
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>
        </div>
    );
}