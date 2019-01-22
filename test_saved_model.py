import numpy as np
import tensorflow as tf
import cv2

# try:
#     assert tf.__version__ == '1.11.0'
# except:
#     exit('You must have Tensorflow 1.11')

def run_by_weights(x_, y_):
    Flatten, Dense, Dropout = tf.keras.layers.Flatten, tf.keras.layers.Dense, tf.keras.layers.Dropout
    Sequential = tf.keras.models.Sequential
    def create_model():
        model = Sequential([
                    Flatten(),
                    Dense(512, activation=tf.nn.relu),
                    Dropout(0.2),
                    Dense(10, activation=tf.nn.softmax)
                ])
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
        return model
    model = create_model()
    checkpoint_path = "checkpoints/cp.ckpt"
    new_model_wt = create_model()
    new_model_wt.load_weights(checkpoint_path)
    print('Prediction = %s and Real Label = %s' % (np.argmax(new_model_wt.predict(x_)), y_))


def run_by_full_model(x_, y_):
    new_model = tf.keras.models.load_model('my_mnist_model.h5')
    print('Prediction = %s and Real Label = %s' % (np.argmax(new_model.predict(x_)), y_))


def main():
    mnist = tf.keras.datasets.mnist
    (X_train, Y_train), (X_test, Y_test) =  mnist.load_data()
    X_train, X_test = X_train/255.0, X_test/255.0
    r = np.random.randint(0, 10**4)
    img = X_test[r]
    cv2.imwrite('img.jpg', img)
    x_, y_ = np.expand_dims(img, axis = 0), Y_test[r]
    run_by_weights(x_ = x_, y_ = y_)
    run_by_full_model(x_ = x_, y_ = y_)

if __name__ == '__main__':
    main()
