import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

function useValue<T = string>(cb: (value: T) => void) {
  return (
    event: ChangeEvent<{
      value: T
    }>
  ) => {
    cb(event.target.value)
  }
}

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [targetLength, setTargetLength] = useState(2000)
  const [text, setText] = useState('')

  const onTargetLengthChange = useValue((v) => {
    if (/[0-9]+/.test(v)) {
      setTargetLength(parseInt(v))
    } else {
      setTargetLength(0)
    }
  })

  const onTextChange = useValue((v) => setText(v))

  return (
    <>
      <div className="bg-progress"></div>
      <div className="container">
        <div className="target-form">
          <input
            className="target-input"
            type="tel"
            value={text.length}
            disabled
          />
          <span>/</span>
          <input
            className="target-input"
            type="tel"
            value={targetLength}
            onChange={onTargetLengthChange}
          />
        </div>
        <textarea
          className="main-textarea"
          autoFocus
          value={text}
          onChange={onTextChange}
        ></textarea>
      </div>

      <style global jsx>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: white;
        }

        .container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;

          display: flex;

          justify-content: center;
          align-items: center;

          flex-direction column;

          width: 100%;
          height: 100vh;
        }

        .target-form {
          margin-bottom: 32px;
        }

        .target-input {
          text-align: center;

          width: 100px;
          height: 48px;

          outline: none;
          border: none;
          border-radius: 6px;

          margin: 0 1rem;

          font-size: 1.1rem;

          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);
        }

        .target-input:disabled {
          background: rgba(255, 255, 255, 0.6);
          color: inherit;
        }

        .main-textarea {
          resize: none;

          max-width: 800px;
          max-height: 600px;

          width: 100%;
          height: 100%;

          outline: none;
          border: none;
          border-radius: 6px;

          line-height: 1.6rem;

          padding: 1rem;

          font-size: 1.2rem;

          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);
        }

        .bg-progress {
          position: absolute;
          z-index: 0;

          top: ${Math.min(100, (text.length / targetLength) * 100)}%;
          right: 0;
          bottom: 0;
          left: 0;

          transition: all 100ms ease;

          background: #EF9A9A;
        }
      `}</style>
    </>
  )
}

export default HomePage
