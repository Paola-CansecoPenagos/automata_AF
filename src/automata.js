export const automata = (input) => {
    const states = {
        q0: {
            W: "q1", X: "q10"
        },
        q1: { 
            Y: "q2", Z: "q2"
        },
        q2: { 
            "-": "q3", 
        },
        q3: {
            0 : "q4",
            1: "q11", 2: "q11", 3: "q11", 4: "q11", 5: "q11", 6: "q11", 7: "q11", 8: "q11", 9: "q11"
        },
        q4: { 
            0 : "q5", 
            1: "q12", 2: "q12", 3: "q12", 4: "q12", 5: "q12", 6: "q12", 7: "q12", 8: "q12", 9: "q12"
        },
        q5: {
            0: "q6",
            1: "q13", 2: "q13", 3: "q13", 4: "q13", 5: "q13", 6: "q13", 7: "q13", 8: "q13", 9: "q13"
        },
        q6: {
            1: "q7", 2: "q7", 3: "q7", 4: "q7", 5: "q7", 6: "q7", 7: "q7", 8: "q7", 9: "q7"
        },
        q7: {
            "-": "q8", 
        },
        q8: {
            A: "q9", B: "q9", C: "q9", D: "q9", E: "q9", F: "q9", G: "q9", H: "q9", I: "q9",
            J: "q9", K: "q9", L: "q9", M: "q9", N: "q9", O: "q9", P: "q9", Q: "q9", R: "q9",
            S: "q9", T: "q9", U: "q9", V: "q9", W: "q9", X: "q9", Y: "q9", Z: "q9"
        },
        q10: {
            A: "q2", B: "q2", C: "q2", D: "q2", E: "q2"
        },
        q11: {
            0: "q12", 1: "q12", 2: "q12", 3: "q12", 4: "q12", 5: "q12", 6: "q12", 7: "q12", 8: "q12", 9: "q12"
        },
        q12: {
            0: "q13", 1: "q13", 2: "q13", 3: "q13", 4: "q13", 5: "q13", 6: "q13", 7: "q13", 8: "q13", 9: "q13"
        },
        q13: {
            0: "q7", 1: "q7", 2: "q7", 3: "q7", 4: "q7", 5: "q7", 6: "q7", 7: "q7", 8: "q7", 9: "q7"
        }
    };

    let currentState = "q0"
    let message = "q0"

    for (let i = 0; i < input.length; i++) {
        const currentChar = input.substring(i, i + 1)

        try {
            if (!states[currentState][currentChar]) {
                message = `${message} ` 
                return { success: false, msg: message };
            }
        } catch (error) {
            message = `${message} `
            return { success: false, msg: message };
        }
        currentState = states[currentState][currentChar];
        message = `${message} --> ${currentState}`
    }

    if (currentState === "q9") {
        return { success: true, msg: message };
    }
    message = `${message} `
    return { success: false, msg: message };
};
