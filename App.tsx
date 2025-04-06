import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { Formik } from 'formik'
//form falidation
import * as Yup from 'yup'

const passwordSchema = Yup.object().shape
  ({
    passwordLength: Yup.number()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must be at most 20 characters long')
      .required('Password Length is required')
  })
const App = () => {
  const [passowrd, setPassword] = useState('')
  const [ispassGenerated, setIsPasswordGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {

    let characterList = ''
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberCharacters = '0123456789'
    const symbolCharacters = '!@#$%^&*()_+[]{}|;:,.<>?'
    if (lowerCase) {
      characterList += lowerCaseCharacters
    }
    if (upperCase) {
      characterList += upperCaseCharacters
    }
    if (numbers) {
      characterList += numberCharacters
    }
    if (symbols) {
      characterList += symbolCharacters
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPasswordGenerated(true)



  }

  const createPassword = (characters: string, passwordLength: number) => {

    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(characterIndex)

    }
    return result
  }

  const resetPasswordState = () => {

    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.background}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>

          <Text style={styles.title}>
            Password Generator
          </Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values)
              generatePasswordString(Number(values.passwordLength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>

                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>
                      Password Length
                    </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 8'
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>
                      Include Lowercase
                    </Text>
                  </View>

                  <View>
                    <BouncyCheckBox
                      useBuiltInState={false}
                      isChecked={lowerCase}
                      fillColor='#29AB87'
                      onPress={() => setLowerCase(!lowerCase)}
                    />
                  </View>
                </View>


                <View style={styles.inputWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>
                      Include UpperCase
                    </Text>
                  </View>

                  <View>
                    <BouncyCheckBox
                      useBuiltInState={false}
                      isChecked={upperCase}
                      fillColor='#29AB87'
                      onPress={() => setUpperCase(!upperCase)}
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>
                      Include Numbers
                    </Text>
                  </View>

                  <View>
                    <BouncyCheckBox
                      useBuiltInState={false}
                      isChecked={numbers}
                      fillColor='#29AB87'
                      onPress={() => setNumbers(!numbers)}
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>
                      Include Symbols
                    </Text>
                  </View>

                  <View>
                    <BouncyCheckBox
                      useBuiltInState={false}
                      isChecked={symbols}
                      fillColor='#29AB87'
                      onPress={() => setSymbols(!symbols)}
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>
                      Generate Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset()
                      resetPasswordState()
                    }
                    }
                  >
                    <Text style={styles.secondaryBtnTxt}>
                      Reset Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {ispassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>
              Result :
            </Text>
            <Text style={styles.description}>
              Long Press to Copy
            </Text>
            <Text style={styles.generatedPassword} selectable={true}>
              {passowrd}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  background : {
    backgroundColor: '#f0f4f8',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // <-- make sure it takes full width

  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});