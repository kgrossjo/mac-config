#!/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc

function set_variable(name, value) {
    return {
        set_variable: {
            name: name,
            value: value,
        }
    };
}

function variable_if(name, value) {
    return {
        type: "variable_if",
        name: name,
        value: value,
    };
}

function with_any_modifier(key_code) {
    return {
        key_code: key_code,
        modifiers: { optional: [ "any" ] },
    };
}

function with_modifiers(key_code, modifiers) {
    return {
        key_code: key_code,
        modifiers: {
            mandatory: modifiers,
            optional: ["any"],
        }
    };
}

function with_exact_modifiers(key_code, modifiers) {
    return {
        key_code: key_code,
        modifiers: {
            mandatory: modifiers,
        }
    };
}

function remap_to_modifiers(key_code, modifiers) {
    return {
        key_code: key_code,
        modifiers: modifiers,
    };
}

function remap_vinav_key(from, to) {
    return {
        conditions: [ variable_if("vinav", 1) ],
        from: {
            key_code: from,
            modifiers: {
                optional: ["any"]
            }
        },
        to: [
            {
                key_code: to
            }
        ],
        type: "basic",
    };
}

function remap_vinav_with_modifiers(from, from_modifiers, to, to_modifiers) {
    return {
        conditions: [ variable_if("vinav", 1) ],
        from: with_exact_modifiers(from, from_modifiers),
        to: [
            remap_to_modifiers(to, to_modifiers)
        ],
        type: "basic",
    };
}

function remap_vinav_with_modifiers_and_exit(from, from_modifiers, to, to_modifiers) {
    return {
        conditions: [ variable_if("vinav", 1) ],
        from: with_exact_modifiers(from, from_modifiers),
        to: [
            remap_to_modifiers(to, to_modifiers),
            set_variable("vinav", 0),
            show_message(""),
        ],
        type: "basic",
    };
}

function show_message(msg) {
    return {
        set_notification_message: {
            id: "vinav",
            text: msg,
        }
    };
}

let vinav_rules = {
    "complex_modifications": {
        "parameters": {
            "basic.simultaneous_threshold_milliseconds": 50,
            "basic.to_delayed_action_delay_milliseconds": 500,
            "basic.to_if_alone_timeout_milliseconds": 1000,
            "basic.to_if_held_down_threshold_milliseconds": 500,
            "mouse_motion_to_scroll.speed": 100
        },
        "rules": [
            {
                "description": "Change caps_lock to control if pressed with other keys, to escape if pressed alone.",
                "manipulators": [
                    {
                        "from": with_any_modifier("caps_lock"),
                        "to": [
                            {
                                "key_code": "left_control"
                            }
                        ],
                        "to_if_alone": [
                            {
                                "key_code": "escape"
                            }
                        ],
                        "type": "basic"
                    }
                ]
            },
            {
                "description": "Change cmd to cmd if pressed with other keys, toggle vinav if pressed alone.",
                "manipulators": [
                    {
                        conditions: [ variable_if("vinav", 0) ],
                        "from": with_any_modifier("left_command"),
                        "to": [
                            {
                                "key_code": "left_command"
                            }
                        ],
                        "to_if_alone": [ 
                            set_variable("vinav", 1),
                            show_message("VI"),
                        ],
                        "type": "basic"
                    },
                    {
                        conditions: [ variable_if("vinav", 0) ],
                        "from": with_any_modifier("right_command"),
                        "to": [
                            {
                                "key_code": "right_command"
                            }
                        ],
                        "to_if_alone": [ 
                            set_variable("vinav", 1),
                            show_message("VI"),
                        ],
                        "type": "basic"
                    },
                    {
                        conditions: [ variable_if("vinav", 1) ],
                        "from": with_any_modifier("left_command"),
                        "to": [
                            {
                                "key_code": "left_command"
                            }
                        ],
                        "to_if_alone": [ 
                            set_variable("vinav", 0),
                            show_message(""),
                        ],
                        "type": "basic"
                    },
                    {
                        conditions: [ variable_if("vinav", 1) ],
                        "from": with_any_modifier("right_command"),
                        "to": [
                            {
                                "key_code": "right_command"
                            }
                        ],
                        "to_if_alone": [ 
                            set_variable("vinav", 0),
                            show_message(""),
                        ],
                        "type": "basic"
                    },
                    remap_vinav_key("h", "left_arrow"),
                    remap_vinav_key("j", "down_arrow"),
                    remap_vinav_key("k", "up_arrow"),
                    remap_vinav_key("l", "right_arrow"),
                    remap_vinav_with_modifiers("g", [], "up_arrow", ["command"]),
                    remap_vinav_with_modifiers("g", ["shift"], "down_arrow", ["command"]),
                    remap_vinav_with_modifiers("x", [], "delete_forward", []),
                    remap_vinav_with_modifiers("x", ["shift"], "delete_or_backspace", []),
                    remap_vinav_with_modifiers("w", [], "right_arrow", ["option"]),
                    remap_vinav_with_modifiers("b", [], "left_arrow", ["option"]),
                    remap_vinav_with_modifiers_and_exit("a", ["shift"], "right_arrow", ["command"]),
                    remap_vinav_with_modifiers_and_exit("i", ["shift"], "left_arrow", ["command"]),
                    remap_vinav_with_modifiers("n", [], "page_down", []),
                    remap_vinav_with_modifiers("p", [], "page_up", []),
                ]
            }
        ]
    },
    "devices": [],
    "fn_function_keys": [
    ],
    "name": "Vinav",
    "parameters": {
        "delay_milliseconds_before_open_device": 1000
    },
    "selected": false,
    "simple_modifications": [],
    "virtual_hid_keyboard": {
        "country_code": 0,
        "indicate_sticky_modifier_keys_state": true,
        "mouse_key_xy_scale": 100
    }
};

function remap_spc_key(from, to) {
    return {
        conditions: [ variable_if("spc_down", 1) ],
        from: with_any_modifier(from),
        to: [{key_code: to}],
        type: "basic",
    };
}

function remap_spc_with_modifiers(from, from_modifiers, to, to_modifiers) {
    return {
        conditions: [ variable_if("spc_down", 1) ],
        from: with_exact_modifiers(from, from_modifiers),
        to: [
            remap_to_modifiers(to, to_modifiers)
        ],
        type: "basic",
    };
}

let spc_rules = {
    "complex_modifications": {
        "parameters": {
            "basic.simultaneous_threshold_milliseconds": 50,
            "basic.to_delayed_action_delay_milliseconds": 500,
            "basic.to_if_alone_timeout_milliseconds": 1000,
            "basic.to_if_held_down_threshold_milliseconds": 150,
            "mouse_motion_to_scroll.speed": 100
        },
        "rules": [
            {
                "description": "Change caps_lock to control if pressed with other keys, to escape if pressed alone.",
                "manipulators": [
                    {
                        "from": with_any_modifier("caps_lock"),
                        "to": [
                            {
                                "key_code": "left_control"
                            }
                        ],
                        "to_if_alone": [
                            {
                                "key_code": "escape"
                            }
                        ],
                        "type": "basic"
                    }
                ]
            },
            {
                "description": "Space as modifier, as itself when pressed alone",
                "manipulators": [
                    {
                        "from": with_any_modifier("spacebar"),
                        "to_if_held_down": [
                            set_variable("spc_down", 1),
                        ],
                        "to_if_alone": [ 
                            set_variable("spc_down", 0),
                            { key_code: "spacebar", halt: true },
                        ],
                        to_after_key_up: [ 
                            { key_code: "vk_none" },
                            set_variable("spc_down", 0),
                        ],
                        "type": "basic"
                    },
                    {
                        conditions: [ variable_if("spc_down", 1) ],
                        "from": with_any_modifier("spacebar"),
                        "to_after_key_up": [ set_variable("spc_down", 0) ],
                        "type": "basic"
                    },
                    remap_spc_key("h", "left_arrow"),
                    remap_spc_key("j", "down_arrow"),
                    remap_spc_key("k", "up_arrow"),
                    remap_spc_key("l", "right_arrow"),
                    remap_spc_key("d", "delete_forward"),
                    remap_spc_key("x", "delete_or_backspace"),
                    remap_spc_key("m", "return_or_enter"),
                    remap_spc_key("open_bracket", "home"),
                    remap_spc_key("close_bracket", "end"),
                    remap_spc_with_modifiers("w", [], "delete_or_backspace", ["option"]),
                    remap_spc_with_modifiers("y", [], "delete_forward", ["option"]),
                    remap_spc_with_modifiers("a", [], "left_arrow", ["command"]),
                    remap_spc_with_modifiers("e", [], "right_arrow", ["command"]),
                    remap_spc_with_modifiers("n", [], "page_down", []),
                    remap_spc_with_modifiers("p", [], "page_up", []),
                    remap_spc_with_modifiers("comma", [], "left_arrow", ["option"]),
                    remap_spc_with_modifiers("period", [], "right_arrow", ["option"]),
                    remap_spc_with_modifiers("s", [], "spacebar", []),
                ]
            }
        ]
    },
    "devices": [],
    "fn_function_keys": [
    ],
    "name": "spc",
    "parameters": {
        "delay_milliseconds_before_open_device": 1000
    },
    "selected": false,
    "simple_modifications": [],
    "virtual_hid_keyboard": {
        "country_code": 0,
        "indicate_sticky_modifier_keys_state": true,
        "mouse_key_xy_scale": 100
    }
};

// -- CLnav --

function clnav_show_message(msg) {
    return {
        set_notification_message: {
            id: "normal_mode",
            text: msg,
        }
    };
}

function remap_capsdown_key(from, to) {
    return remap_clnav_key(from, to, "caps_down");
}

function remap_capsctrl_key(from, to) {
    return remap_clnav_key(from, to, "caps_ctrl");
}

function remap_capsfn_key(from, to) {
    return remap_clnav_key(from, to, "caps_fn");
}

function remap_clnav_key(from, to, variable) {
    return {
        conditions: [ variable_if(variable, 1) ],
        from: with_any_modifier(from),
        to: [{key_code: to}],
        type: "basic",
    };
}

function remap_clnav_with_modifiers(from, from_modifiers, to, to_modifiers) {
    return {
        conditions: [ variable_if("caps_down", 1) ],
        from: with_exact_modifiers(from, from_modifiers),
        to: [
            remap_to_modifiers(to, to_modifiers)
        ],
        type: "basic",
    };
}

function remap_capsfn(from, to) {
    return {
        "conditions": [variable_if("caps_fn", 1)],
        "from": with_any_modifier(from),
        "to": [
            set_variable("caps_fn", 0),
            { key_code: to }
        ],
        "type": "basic"
    };
}

function remap_capsctrl(key_code, modifiers) {
    return {
        "conditions": [variable_if("caps_ctrl", 1)],
        "from": with_any_modifier(key_code),
        "to": [
            set_variable("caps_ctrl", 0),
            remap_to_modifiers(key_code, modifiers),
        ],
        "type": "basic"
    };
}

function remap_capsdown(from, to) {
    return {
        "conditions": [variable_if("caps_down", 1)],
        "from": with_any_modifier(from),
        "to": [{ key_code: to }],
        "type": "basic"
    };
}

function remap_capsdown_with_modifier(from, to, modifiers) {
    return {
        "conditions": [variable_if("caps_down", 1)],
        "from": with_any_modifier(from),
        "to": [{ "key_code": to, "modifiers": modifiers }],
        "type": "basic"
    };
}

let clnav_rules = {
    "complex_modifications": {
        "parameters": {
            "basic.simultaneous_threshold_milliseconds": 50,
            "basic.to_delayed_action_delay_milliseconds": 500,
            "basic.to_if_alone_timeout_milliseconds": 1000,
            "basic.to_if_held_down_threshold_milliseconds": 500,
            "mouse_motion_to_scroll.speed": 100
        },
        "rules": [
            {
                "description": "Magic caps lock: escape if alone, modifier otherwise",
                "manipulators": [
                    {
                        "from": with_any_modifier("caps_lock"),
                        "to": [ set_variable("caps_down", 1) ],
                        "to_after_key_up": [ set_variable("caps_down", 0) ],
                        "to_if_alone": [
                            set_variable("caps_down", 0),
                            { "key_code": "escape" }
                        ],
                        "type": "basic"
                    },
                    {
                        from: with_any_modifier("return_or_enter"),
                        to: [ set_variable("caps_down", 1) ],
                        to_after_key_up: [ set_variable("caps_down", 0) ],
                        to_if_alone: [
                            set_variable("caps_down", 0),
                            { key_code: "return_or_enter" },
                        ],
                        type: "basic",
                    },
                    {
                        "conditions": [ variable_if("caps_down", 1), ],
                        "from": with_any_modifier("caps_lock"),
                        "to": [ set_variable("caps_down", 0) ],
                        "to_after_key_up": [ set_variable("caps_down", 0) ],
                        type: "basic",
                    },
                    {
                        "conditions": [ variable_if("caps_down", 1), ],
                        "from": with_any_modifier("return_or_enter"),
                        "to": [ set_variable("caps_down", 0) ],
                        "to_after_key_up": [ set_variable("caps_down", 0) ],
                        type: "basic",
                    },
                    {
                        "conditions": [ variable_if("caps_down", 1) ],
                        "from": with_any_modifier("x"),
                        "to": [ set_variable("caps_fn", 1) ],
                        "type": "basic"
                    },
                    {
                        "conditions": [ variable_if("caps_down", 1) ],
                        "from": with_any_modifier("c"),
                        "to": [ set_variable("caps_ctrl", 1) ],
                        "type": "basic"
                    },
                    {
                        "conditions": [ variable_if("caps_down", 1) ],
                        "from": with_any_modifier("o"),
                        "to": [ set_variable("caps_ctrl", 1) ],
                        "type": "basic"
                    },
                    {
                        "from": with_any_modifier("slash"),
                        "to_if_alone": [ { key_code: "slash" } ],
                        "to_if_held_down": [ { "key_code": "right_control" } ],
                        type: "basic",
                    },
                    remap_capsfn("1", "f1"),
                    remap_capsfn("2", "f2"),
                    remap_capsfn("3", "f3"),
                    remap_capsfn("4", "f4"),
                    remap_capsfn("5", "f5"),
                    remap_capsfn("6", "f6"),
                    remap_capsfn("7", "f7"),
                    remap_capsfn("8", "f8"),
                    remap_capsfn("9", "f9"),
                    remap_capsfn("0", "f10"),
                    remap_capsfn("hyphen", "f11"),
                    remap_capsfn("equal_sign", "f12"),
                    remap_capsctrl("semicolon", ["control"]),
                    remap_capsctrl("quote", ["control"]),
                    remap_capsctrl("backslash", ["control"]),
                    remap_capsctrl("hyphen", ["control"]),
                    remap_capsctrl("equal_sign", ["control"]),
                    remap_capsctrl("comma", ["control"]),
                    remap_capsctrl("period", ["control"]),
                    remap_capsctrl("slash", ["control"]),
                    remap_capsctrl("return_or_enter", ["control"]),
                    remap_capsctrl("delete_or_backspace", ["control"]),
                    remap_capsctrl("slash", ["control"]),
                    remap_capsctrl("1", ["control"]),
                    remap_capsctrl("2", ["control"]),
                    remap_capsctrl("3", ["control"]),
                    remap_capsctrl("4", ["control"]),
                    remap_capsctrl("5", ["control"]),
                    remap_capsctrl("6", ["control"]),
                    remap_capsctrl("7", ["control"]),
                    remap_capsctrl("8", ["control"]),
                    remap_capsctrl("9", ["control"]),
                    remap_capsctrl("0", ["control"]),
                    remap_capsctrl("a", ["control"]),
                    remap_capsctrl("b", ["control"]),
                    remap_capsctrl("c", ["control"]),
                    remap_capsctrl("d", ["control"]),
                    remap_capsctrl("e", ["control"]),
                    remap_capsctrl("f", ["control"]),
                    remap_capsctrl("g", ["control"]),
                    remap_capsctrl("h", ["control"]),
                    remap_capsctrl("i", ["control"]),
                    remap_capsctrl("j", ["control"]),
                    remap_capsctrl("k", ["control"]),
                    remap_capsctrl("l", ["control"]),
                    remap_capsctrl("m", ["control"]),
                    remap_capsctrl("n", ["control"]),
                    remap_capsctrl("o", ["control"]),
                    remap_capsctrl("p", ["control"]),
                    remap_capsctrl("q", ["control"]),
                    remap_capsctrl("r", ["control"]),
                    remap_capsctrl("s", ["control"]),
                    remap_capsctrl("t", ["control"]),
                    remap_capsctrl("u", ["control"]),
                    remap_capsctrl("v", ["control"]),
                    remap_capsctrl("w", ["control"]),
                    remap_capsctrl("x", ["control"]),
                    remap_capsctrl("y", ["control"]),
                    remap_capsctrl("z", ["control"]),
                    remap_capsdown("g", "escape"),
                    remap_capsdown_with_modifier("tab", "tab", ["control"]),
                    remap_capsdown("p", "page_up"),
                    remap_capsdown("n", "page_down"),
                    remap_capsdown("f", "right_arrow"),
                    remap_capsdown("b", "left_arrow"),
                    remap_capsdown("k", "up_arrow"),
                    remap_capsdown("j", "down_arrow"),
                    remap_capsdown("l", "right_arrow"),
                    remap_capsdown("h", "left_arrow"),
                    remap_capsdown_with_modifier("a", "left_arrow", ["command"]),
                    remap_capsdown_with_modifier("e", "right_arrow", ["command"]),
                    remap_capsdown_with_modifier("v", "page_down", ["command"]),
                    remap_capsdown_with_modifier("slash", "page_down", ["command"]),
                    remap_capsdown_with_modifier("u", "page_up", ["command"]),
                    remap_capsdown("d", "delete_forward"),
                    remap_capsdown("m", "return_or_enter"),
                    remap_capsdown_with_modifier("spacebar", "spacebar", ["left_control"]),
                    remap_capsdown_with_modifier("w", "delete_or_backspace", ["left_alt"]),
                    remap_capsdown_with_modifier("y", "delete_forward", ["left_alt"]),
                    remap_capsdown_with_modifier("comma", "left_arrow", ["left_alt"]),
                    remap_capsdown_with_modifier("period", "right_arrow", ["left_alt"]),
                    remap_capsdown("open_bracket", "home"),
                    remap_capsdown("close_bracket", "end"),
                ],
                "type": "basic"
            },
            {
                "description": "VI Normal Mode with Command",
                "manipulators": [
                    {
                        "conditions": [
                            variable_if("normal_mode", 0),
                        ],
                        "from": with_any_modifier("left_command"),
                        "to": [
                            {
                                "key_code": "left_command"
                            }
                        ],
                        "to_if_alone": [
                            set_variable("normal_mode", 1) ,
                            clnav_show_message("VI normal mode"),
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            variable_if("normal_mode", 0),
                        ],
                        "from": with_any_modifier("right_command"),
                        "to": [
                            {
                                "key_code": "right_command"
                            }
                        ],
                        "to_if_alone": [
                            set_variable("normal_mode", 1) ,
                            clnav_show_message("VI normal mode"),
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            variable_if("normal_mode", 1)
                        ],
                        "from": with_any_modifier("left_command"),
                        "to": [
                            {
                                "key_code": "left_command"
                            }
                        ],
                        "to_if_alone": [
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            variable_if("normal_mode", 1)
                        ],
                        "from": with_any_modifier("right_command"),
                        "to": [ { "key_code": "right_command" } ],
                        "to_if_alone": [
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [ variable_if("normal_mode", 1) ],
                        "from": with_any_modifier("escape"),
                        "to": [
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        "type": "basic"
                    },
                    {
                        conditions: [ variable_if("normal_mode", 1) ],
                        from: with_exact_modifiers("i", []),
                        to: [
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        type: "basic"
                    },
                    {
                        conditions: [ variable_if("normal_mode", 1) ],
                        from: with_exact_modifiers("i", ["shift"]),
                        to: [
                            { key_code: "left_arrow", modifiers: ["command"] },
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        type: "basic"
                    },
                    {
                        conditions: [ variable_if("normal_mode", 1) ],
                        from: with_exact_modifiers("a", []),
                        to: [
                            { key_code: "right_arrow" },
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        type: "basic"
                    },
                    {
                        conditions: [ variable_if("normal_mode", 1) ],
                        from: with_exact_modifiers("a", ["shift"]),
                        to: [
                            { key_code: "right_arrow", modifiers: ["command"] },
                            set_variable("normal_mode", 0),
                            clnav_show_message(""),
                        ],
                        type: "basic"
                    },
                    {
                        "conditions": [
                            {
                                "name": "normal_mode",
                                "type": "variable_if",
                                "value": 1
                            }
                        ],
                        "from": {
                            "key_code": "h",
                            "modifiers": {
                                "optional": [
                                    "any"
                                ]
                            }
                        },
                        "to": [
                            {
                                "key_code": "left_arrow"
                            }
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            {
                                "name": "normal_mode",
                                "type": "variable_if",
                                "value": 1
                            }
                        ],
                        "from": {
                            "key_code": "l",
                            "modifiers": {
                                "optional": [
                                    "any"
                                ]
                            }
                        },
                        "to": [
                            {
                                "key_code": "right_arrow"
                            }
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            {
                                "name": "normal_mode",
                                "type": "variable_if",
                                "value": 1
                            }
                        ],
                        "from": {
                            "key_code": "k",
                            "modifiers": {
                                "optional": [
                                    "any"
                                ]
                            }
                        },
                        "to": [
                            {
                                "key_code": "up_arrow"
                            }
                        ],
                        "type": "basic"
                    },
                    {
                        "conditions": [
                            {
                                "name": "normal_mode",
                                "type": "variable_if",
                                "value": 1
                            }
                        ],
                        "from": {
                            "key_code": "j",
                            "modifiers": {
                                "optional": [
                                    "any"
                                ]
                            }
                        },
                        "to": [
                            {
                                "key_code": "down_arrow"
                            }
                        ],
                        "type": "basic"
                    }
                ],
                "type": "basic"
            }
        ]
    },
    "devices": [
        {
            "disable_built_in_keyboard_if_exists": false,
            "fn_function_keys": [],
            "identifiers": {
                "is_keyboard": true,
                "is_pointing_device": false,
                "product_id": 384,
                "vendor_id": 1130
            },
            "ignore": false,
            "manipulate_caps_lock_led": true,
            "simple_modifications": [
                {
                    "from": {
                        "key_code": "left_option"
                    },
                    "to": [
                        {
                            "key_code": "left_command"
                        }
                    ]
                },
                {
                    "from": {
                        "key_code": "left_command"
                    },
                    "to": [
                        {
                            "key_code": "left_option"
                        }
                    ]
                },
                {
                    "from": {
                        "key_code": "right_option"
                    },
                    "to": [
                        {
                            "key_code": "right_command"
                        }
                    ]
                },
                {
                    "from": {
                        "key_code": "right_command"
                    },
                    "to": [
                        {
                            "key_code": "right_option"
                        }
                    ]
                },
                {
                    "from": {
                        "key_code": "application"
                    },
                    "to": [
                        {
                            "key_code": "right_option"
                        }
                    ]
                }
            ],
            "treat_as_built_in_keyboard": false
        }
    ],
    "fn_function_keys": [
    ],
    "name": "CL",
    "parameters": {
        "delay_milliseconds_before_open_device": 1000
    },
    "selected": true,
    "simple_modifications": [],
    "virtual_hid_keyboard": {
        "country_code": 0,
        "indicate_sticky_modifier_keys_state": true,
        "mouse_key_xy_scale": 100
    }
};

let result = {
    "global": {
        "check_for_updates_on_startup": true,
        "show_in_menu_bar": true,
        "show_profile_name_in_menu_bar": true
    },
    "profiles": [
        {
            "complex_modifications": {
                "parameters": {
                    "basic.simultaneous_threshold_milliseconds": 50,
                    "basic.to_delayed_action_delay_milliseconds": 0,
                    "basic.to_if_alone_timeout_milliseconds": 250,
                    "basic.to_if_held_down_threshold_milliseconds": 250,
                    "mouse_motion_to_scroll.speed": 100
                },
                "rules": [
                    {
                        "description": "SpaceFN: Space enables SpaceFN mode (see: https://geekhack.org/index.php?topic=51069.0)",
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "spacebar",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to_after_key_up": [
                                    {
                                        "set_variable": {
                                            "name": "spacefn_mode",
                                            "value": 0
                                        }
                                    },
                                    {
                                        "key_code": "vk_none"
                                    }
                                ],
                                "to_delayed_action": {
                                    "to_if_canceled": [
                                        {
                                            "set_variable": {
                                                "name": "spacefn_mode",
                                                "value": 0
                                            }
                                        },
                                        {
                                            "key_code": "spacebar"
                                        }
                                    ]
                                },
                                "to_if_alone": [
                                    {
                                        "set_variable": {
                                            "name": "spacefn_mode",
                                            "value": 0
                                        }
                                    },
                                    {
                                        "halt": true,
                                        "key_code": "spacebar"
                                    }
                                ],
                                "to_if_held_down": [
                                    {
                                        "set_variable": {
                                            "name": "spacefn_mode",
                                            "value": 1
                                        }
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "SpaceFN (Kai): Space+s/g to Space/Escape (hold to repeat)",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "g",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "escape"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "s",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "spacebar"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "SpaceFN (Kai): Space+[ae] to cmd-left, cmd-right",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "a",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_arrow",
                                        "modifiers": [
                                            "left_command"
                                        ]
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "e",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "right_arrow",
                                        "modifiers": [
                                            "left_command"
                                        ]
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "SpaceFN: Space+[hjkl] to Left, Down, Up, Right",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "h",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "b",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "j",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "down_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "k",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "up_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "l",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "right_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "f",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "right_arrow"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "w",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "right_arrow",
                                        "modifiers": [
                                            "left_option"
                                        ]
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "q",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_arrow",
                                        "modifiers": [
                                            "left_option"
                                        ]
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "x",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "delete_forward"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "d",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "delete_forward",
                                        "modifiers": [
                                            "left_option"
                                        ]
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "SpaceFN: Space+[uopnm] to Home, End, PgUp, PgDown, Return",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "m",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "return_or_enter"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "p",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "page_up"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "n",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "page_down"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "u",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "home"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "conditions": [
                                    {
                                        "name": "spacefn_mode",
                                        "type": "variable_if",
                                        "value": 1
                                    }
                                ],
                                "from": {
                                    "key_code": "o",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "end"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "Change caps_lock to control if pressed with other keys, to escape if pressed alone.",
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "caps_lock",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_control"
                                    }
                                ],
                                "to_if_alone": [
                                    {
                                        "key_code": "escape"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "Change cmd to cmd if pressed with other keys, to f20 if pressed alone.",
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "left_command",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "left_command"
                                    }
                                ],
                                "to_if_alone": [
                                    {
                                        "key_code": "f20"
                                    }
                                ],
                                "type": "basic"
                            },
                            {
                                "from": {
                                    "key_code": "right_command",
                                    "modifiers": {
                                        "optional": [
                                            "any"
                                        ]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "right_command"
                                    }
                                ],
                                "to_if_alone": [
                                    {
                                        "key_code": "f20"
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    }
                ]
            },
            "devices": [],
            "fn_function_keys": [
            ],
            "name": "dflt",
            "parameters": {
                "delay_milliseconds_before_open_device": 1000
            },
            "selected": false,
            "simple_modifications": [],
            "virtual_hid_keyboard": {
                "caps_lock_delay_milliseconds": 0,
                "country_code": 0,
                "indicate_sticky_modifier_keys_state": true,
                "keyboard_type": "ansi",
                "mouse_key_xy_scale": 100
            }
        },
        clnav_rules,
        vinav_rules,
        spc_rules,
    ]
};

print(JSON.stringify(result, null, 4));
